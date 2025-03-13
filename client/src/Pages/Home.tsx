import { useQuery } from "@tanstack/react-query"
import Header from "../Components/Header"
import Music from "../Components/Music"
import Footer from "../Components/Footer"
import { useAppStore } from "../store"

function Home() {
  const setSongs = useAppStore.use.setSongs()
  const songs = useAppStore.use.songs()
  const user = useAppStore.use.user()

  const fetchGospelTracks = async () => {
    const response = await fetch(import.meta.env.VITE_GET_RANDOM_SONGS)
    return response.json()
  }

  const { data, error, isLoading } = useQuery({
    queryKey: ["gospelTracks"],
    queryFn: fetchGospelTracks,
    onSuccess: (fetchedSongs) => setSongs(fetchedSongs)
  })

  return (
    <>
      <main className="md:ml-64">
        <Header user={user} />
        <Music songs={songs} user={user} isLoading={isLoading} error={error} />
      </main>
      <Footer />
    </>
  )
}

export default Home