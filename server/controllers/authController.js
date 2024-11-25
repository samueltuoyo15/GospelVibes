import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import User from '../models/user.js'
import fs from 'fs'
import path from 'path'

dotenv.config();

export const updateProfilePicture = async (req, res) => {
  try {
    const { userId } = req.user 
    const file = req.file
    console.log(file)
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' })
    }

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const imagePath = `/uploads/${file.filename}`
    user.profilePicture = imagePath
    await user.save()
    console.log('success')
    res.status(200).json({
      message: 'Profile picture updated successfully',
      profilePicture: imagePath,
    })
  } catch (error) {
    console.error(error)
    console.log,(error)
    res.status(500).json({ message: 'Error updating profile picture', error })
  }
}

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body
    
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: req.body.email + ' already exists', user: existingUser })
    }
    
    const encryptedPassword = await bcrypt.hash(password, 10)
    
    const newUser = await User.create({
      name,
      email,
      password: encryptedPassword,
      profilePicture: '/user.png',
    });
    
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_SECRET_EXPIRES_IN,
    });
    
    res.status(201).json({
      message: 'User Registered Successfully',
      success: true,
      token,
      user: {
        id: newUser._id,
        username: newUser.name,
        profilePicture: newUser.profilePicture,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error })
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_SECRET_EXPIRES_IN,
    })
    
    res.status(200).json({
      message: 'User Logged In Successfully',
      success: true,
      token,
      user: {
        id: user._id,
        username: user.name,
        profilePicture: user.profilePicture,
      },
    })
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error })
  }
}