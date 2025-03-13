import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import Header from '../Components/Header'
import Music from '../Components/Music'
import Footer from '../Components/Footer'

type MusicProps = {
  id: string
  title: string
  audioUrl: string
  thumbnailUrl: string
  duration: string
  uploader: string
}

type UserProps = {
  id: string
  name: string
  email: string
}

function Home() {
  const [songs, setSongs] = useState<MusicProps | null>(null) // Initialize as null
  const [user, setUser] = useState<UserProps | null>(null) // Initialize as null

  const fetchGospelTracks = async (): Promise<any[]> => {
    const response = await fetch(import.meta.env.VITE_GET_RANDOM_SONGS)
    return response.json()
  }

  const { data: songsData, error, isLoading } = useQuery({
    queryKey: ["gospelTracks"],
    queryFn: fetchGospelTracks,
    onSuccess: (fetchedSongs) => {
      setSongs(fetchedSongs[0]) // Set the first song from the fetched data
    }
  })

  return (
    <>
      <main className="md:ml-64">
        <Header user={user} />
        <Music songs={songs ? [songs] : []} user={user} isLoading={isLoading} error={error} />
      </main>
      <Footer />
    </>
  )
}

export default Home