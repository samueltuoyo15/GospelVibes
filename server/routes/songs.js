import express from 'express'
import axios from 'axios'
import getAccessToken from '../utilities/getAccessToken.js'

const router = express.Router();

router.get('/random-gospel-songs', async (req, res) => {
  try {
    const token = await getAccessToken()
    const response = await axios.get(
      'https://api.spotify.com/v1/search?q=genre:gospel+year:2019-2024&type=track',
      { headers: { Authorization: `Bearer ${token}` }});
    const songs = response.data.tracks.items
    res.json(songs)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch songs' })
  }
})

router.get('/find', async (req, res) => {
  try {
    const search = req.query.search
    const token = await getAccessToken()
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(search)}+genre:gospel+year:2019-2024&type=track`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    const songs = response.data.tracks.items
    res.json(songs)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch songs' })
  }
})

export default router
