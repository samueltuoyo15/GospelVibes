import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useState, useEffect } from 'react'
import { User } from '../types/User'

type MusicProps = {
  song: {
    id: string
    title: string
    audioUrl: string
    thumbnailUrl: string
    duration: string
    uploader: string
  } | null
  user: User | null
  isLoading: boolean
  error: Error | null
}

function Music({ song, user, isLoading }: MusicProps) {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine)
  const [isSongPlaying, setIsSongPlaying] = useState<boolean>(false)
  const [expanded, setExpanded] = useState<boolean>(false)
  const [playback, setPlayback] = useState<HTMLAudioElement | null>(null)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  useEffect(() => {
    if (song) {
      const audio = new Audio(song.audioUrl)
      setPlayback(audio)
      audio.play().catch((err) => console.error('Audio playback failed:', err))
      setIsSongPlaying(true)

      audio.onended = () => {
        setIsSongPlaying(false)
      }

      return () => {
        audio.pause()
        audio.currentTime = 0
      }
    }
  }, [song])

  const toggleExpand = () => setExpanded(!expanded)

  return (
    <>
      <section className="relative select-none text-white mt-5 p-4 overflow-y-scroll mb-20">
        <h2 className="text-lg font-bold mb-2">Made for {user?.username || null}</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-8">
          {isLoading || !song
            ? Array(1).fill(0).map((_, index) => (
                <div key={index} className="space-y-2">
                  <Skeleton height={130} width="100%" baseColor="#e0e0e0" highlightColor="#f0f0f0" />
                  <Skeleton width="80%" />
                  <Skeleton width="60%" />
                </div>
              ))
            : (
                <div key={song.id} onContextMenu={(e) => e.preventDefault()} className="cursor-pointer">
                  <img src={song.thumbnailUrl} className="block w-full rounded" />
                  <p className="text-gray-400 line-clamp-2 text-sm text-justify">{song.uploader}</p>
                  <p>{song.title}</p>
                </div>
              )}
        </div>
      </section>

      {song && (
        <div className="md:absolute bottom-5 md:mx-auto">
          <div className={`${expanded ? 'h-40' : 'h-full bottom-0 overflow-hidden flex justify-center flex-col items-center'} fixed md:relative md:block bottom-14 left-0 w-full bg-gray-900 text-white p-4 transition-height duration-300`}>
            <div onClick={toggleExpand} className="flex items-center justify-between">
              <div className={`flex items-center flex-1 ${!expanded ? 'flex-col' : 'flex-row'}`}>
                <img onContextMenu={(e) => e.preventDefault()} src={song.thumbnailUrl} className={`${!expanded ? 'block w-92 rounded mx-auto' : 'w-10 h-10 mr-3 rounded'}`} />
                <div>
                  <p className="font-bold">{song.title}</p>
                  <p className="text-gray-400">{song.duration}</p>
                </div>
              </div>
              <button onClick={toggleExpand} className={`${!expanded ? 'fixed top-4 left-4 text-2xl' : 'text-white text-xl mr-0'}`}>
                {expanded ? '▲' : '▼'}
              </button>
            </div>
            <div className="mt-4 select-none">
              <button
                className="bg-blue-500 p-2 mr-4 rounded"
                onClick={() => {
                  if (playback) {
                    isSongPlaying ? playback.pause() : playback.play()
                    setIsSongPlaying(!isSongPlaying)
                  }
                }}
              >
                {isSongPlaying ? 'pause' : 'play'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Music