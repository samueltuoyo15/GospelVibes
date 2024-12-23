import { useState } from 'react'
import { Music, Plus, HardDrive, Clock, Play } from 'lucide-react'
import Footer from '../Components/Footer'
declare global {
  interface Window {
    showDirectoryPicker?: () => Promise<FileSystemDirectoryHandle>
  }

  interface FileSystemDirectoryHandle {
    entries(): AsyncIterableIterator<[string, FileSystemFileHandle | FileSystemDirectoryHandle]>
  }
}

interface Song {
  id: number
  title: string
  artist: string
  duration: string
  file?: File
}

function Library() {
  const [recentSongs] = useState<Song[]>([
    { id: 1, title: 'Amazing Grace', artist: 'Various Artists', duration: '4:20' },
    { id: 2, title: 'How Great Thou Art', artist: 'Elvis Presley', duration: '3:02' },
    { id: 3, title: 'I Can Only Imagine', artist: 'MercyMe', duration: '4:08' },
    { id: 4, title: 'Oceans (Where Feet May Fail)', artist: 'Hillsong United', duration: '8:56' },
    { id: 5, title: 'Shout to the Lord', artist: 'Darlene Zschech', duration: '4:12' },
  ])

  const [playlists] = useState([
    { id: 1, name: 'My Worship Mix', songCount: 15 },
    { id: 2, name: 'Sunday Morning', songCount: 20 },
  ])

  const [deviceSongs] = useState<Song[]>([])
  const [isLoading] = useState(false)
  const [error] = useState<string | null>(null)

  async function scanDirectory(dirHandle: FileSystemDirectoryHandle): Promise<Song[]> {
    const songs: Song[] = []
    for await (const [, entry] of dirHandle.entries()) {
      if (entry.kind === 'file' && entry.name.match(/\.(mp3|wav|ogg|m4a)$/i)) {
        const file = await entry.getFile()
        songs.push({
          id: songs.length + 1,
          title: file.name.replace(/\.[^/.]+$/, ""),
          artist: 'Unknown',
          duration: await getAudioDuration(file),
          file: file,
        })
      } else if (entry.kind === 'directory') {
        songs.push(...(await scanDirectory(entry)))
      }
    }
    return songs
  }

  function getAudioDuration(file: File): Promise<string> {
    return new Promise((resolve) => {
      const audio = new Audio(URL.createObjectURL(file))
      audio.addEventListener('loadedmetadata', () => {
        const minutes = Math.floor(audio.duration / 60)
        const seconds = Math.floor(audio.duration % 60)
        resolve(`${minutes}:${seconds.toString().padStart(2, '0')}`)
      })
    })
  }


  return (
    <>
    <div className="min-h-screen bg-gradient-to-r mb-30 from-purple-500 to-blue-500 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Your Library</h1>
      <section className="mb-30">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Clock className="mr-2" /> Recent Songs
        </h2>
        <div className="bg-white bg-opacity-10 rounded-lg p-4">
          {recentSongs.map((song) => (
            <div key={song.id} className="flex items-center justify-between py-2 border-b border-white border-opacity-20 last:border-b-0">
              <div className="flex items-center">
                <Play className="mr-3 cursor-pointer hover:text-yellow-300 transition-colors" />
                <div>
                  <p className="font-medium">{song.title}</p>
                  <p className="text-sm text-gray-300">{song.artist}</p>
                </div>
              </div>
              <span className="text-sm text-gray-300">{song.duration}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Music className="mr-2" /> Your Playlists
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {playlists.map((playlist) => (
            <div key={playlist.id} className="bg-white bg-opacity-10 rounded-lg p-4 hover:bg-opacity-20 transition-all cursor-pointer">
              <h3 className="font-medium mb-2">{playlist.name}</h3>
              <p className="text-sm text-gray-300">{playlist.songCount} songs</p>
            </div>
          ))}
          <div 
            onClick={() => alert('Create Playlist')}
            className="bg-white bg-opacity-10 rounded-lg p-4 flex items-center justify-center cursor-pointer hover:bg-opacity-20 transition-all"
          >
            <Plus className="mr-2" />
            <span>Create New Playlist</span>
          </div>
        </div>
      </section>

      <section className="mb-30">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <HardDrive className="mr-2" /> Device Storage Music
        </h2>
        <button
          onClick={() => alert('Access Device Songs')}
          className="bg-white bg-opacity-10 hover:bg-opacity-20 transition-all px-4 py-2 rounded-lg mb-4"
        >
          Access Device Songs
        </button>
        {isLoading && <p className="text-center py-4">Loading device storage music...</p>}
        {error && <p className="text-center py-4 text-red-300">{error}</p>}
        {!isLoading && !error && deviceSongs.length > 0 && (
          <div className="mb-50 bg-white bg-opacity-10 rounded-lg p-4">
            {deviceSongs.map((song) => (
              <div key={song.id} className="flex items-center justify-between py-2 border-b border-white border-opacity-20 last:border-b-0">
                <div className="flex items-center">
                  <Play className="mr-3 cursor-pointer hover:text-yellow-300 transition-colors" />
                  <div>
                    <p className="font-medium">{song.title}</p>
                    <p className="text-sm text-gray-300">{song.artist}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-300">{song.duration}</span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
    <Footer />
    </>
  )
}

export default Library
