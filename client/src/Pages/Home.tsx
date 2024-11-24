import { useState, useEffect } from 'react'
import Header from '../Components/Header'
import Music from '../Components/Music'
import Footer from '../Components/Footer'
import {User} from '../types/User'

function Home() {
  const [songs, setSongs] = useState<any[]>([])
  const [user, setUser] = useState<User | null>(null)
  const fetchGospelTracks = async () => {
    const response = await fetch('api/songs/random-gospel-songs')
    const data = await response.json()
    console.log(data)
    setSongs(data)
  }

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData) as User)
    }
    fetchGospelTracks()
  }, [])

  return (
    <>
    <Header user={user}/>
    <Music songs={songs} user={user}/>
    <Footer />
    </>
  )
}

export default Home
