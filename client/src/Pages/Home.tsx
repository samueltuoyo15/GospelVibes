import Main from '../main';
import { useState, useEffect } from 'react'
import Header from '../Components/Header'
import Music from '../Components/Music'
import Footer from '../Components/Footer'
import {User} from '../types/User'

function Home() {
  const [songs, setSongs] = useState<any[]>([])
  const [user, setUser] = useState<User | null>(null)
  const fetchGospelTracks = async () => {
    const response = await fetch(import.meta.env.VITE_GET_RANDOM_SONGS)
    const data = await response.json()
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
    <main className="md:ml-64">
    <Header user={user}/>
    <Music songs={songs} user={user}/>
    </main>
    <Footer />
    </>
  )
}

export default Home
