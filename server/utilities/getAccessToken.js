import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()
const client_id = process.env.CLIENT_ID
const client_secret = process.env.CLIENT_SECRET

const getAccessToken = async () => {
  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      'grant_type=client_credentials',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Basic ' + Buffer.from(`${client_id}:${client_secret}`).toString('base64')
        }
      }
    )
    return response.data.access_token
  } catch (error) {
    console.error('Error fetching access token:', error)
    throw new Error('Failed to get Spotify access token')
  }
}

export default getAccessToken
