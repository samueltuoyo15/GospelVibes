import 'react-loading-skeleton/dist/skeleton.css'
import { useState, useEffect } from 'react'
import Footer from '../Components/Footer'

function Search(){
  const [search, setSearch] = useState<string>('')
  const [isEmpty, setIsEmpty] = useState<boolean>(false)
  const [isSongPlaying, setIsSongPlaying] = useState<boolean>(false)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [expanded, setExpanded] = useState<boolean>(false)
  const [playback, setPlayback] = useState<HTMLAudioElement | null>(null)
  const [songs, setSongs] = useState<any[]>([])
  
  const handleSubmission = (e: React.ChangeEvent<HTMLInputElement>) => {
  setSearch(e.target.value)
  fetchGospelTracks();
};

const fetchGospelTracks = async () => {
  const response = await fetch(`api/songs/find?search=${search}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const data = await response.json();
  if(data.length === 0){
    setIsEmpty(true)
  }
  console.log(data)
  setSongs(data)
}

  useEffect(() => {
    if (selectedIndex !== null) {
      const audio = new Audio(songs[selectedIndex].preview_uri)
      setPlayback(audio)
      audio.play()
      setIsSongPlaying(true)

      audio.onended = () => {
        setIsSongPlaying(false)
        setSelectedIndex(null)
      }

      return () => {
        audio.pause()
        audio.currentTime = 0
      }
    }
  }, [selectedIndex, songs])

  const selectSong = (index: number) => {
    if (selectedIndex === index) {
      setIsSongPlaying(!isSongPlaying)
      if (isSongPlaying) {
        playback?.pause()
      } else {
        playback?.play()
      }
    } else {
      setSelectedIndex(index)
      setExpanded(true)
    }
  }

  const toggleExpand = () => setExpanded(!expanded)

  const showPrevious = () => {
    if (selectedIndex && selectedIndex > 0) setSelectedIndex(selectedIndex - 1)
  }

  const showNext = () => {
    if (selectedIndex !== null && selectedIndex < songs.length - 1) setSelectedIndex(selectedIndex + 1)
  }
  return(
    <>
    <section className="p-4 text-white">
      <input type="search" value={search} onChange={handleSubmission} placeholder="What song do you want to listen to" className="p-2 block w-full md:w-56 rounded outline-black bg-white text-black" />
    </section>
      <section className="select-none text-white mt-5 p-4 overflow-x-scroll mb-20">
        <h2 className="text-lg font-bold mb-2">results for {search}</h2>
        <h3 className={!search ? 'text-5xl text-center text-white' : 'hidden'}>You Haven't Made any Searches</h3>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-8">
         {songs.map((track, index) => (
                <div key={track.id} onContextMenu={(e) => e.preventDefault()} onClick={() => selectSong(index)} className="cursor-pointer">
                  <img src={track.album.images[0]?.url} className="block w-full rounded" />
                  <p className="text-gray-400 line-clamp-2 text-sm text-justify">{track.artists[0].name}</p>
                  <p>{track.name}</p>
                </div>
              ))}
        </div>
           {isEmpty && (
            <img src="/no_data.svg" className="text-center w-82 mx-auto" />
          )}
      </section>

      {selectedIndex !== null && (
     <div>
    <div className={`${expanded ? 'h-40' : 'h-full bottom-0 overflow-hidden flex justify-center flex-col items-center'} fixed bottom-14 left-0 w-full bg-gray-900 text-white p-4 transition-height duration-300`}>
    <div onClick={toggleExpand} className="flex items-center justify-between">
    <div className={`flex items-center flex-1 ${!expanded ? 'flex-col' : 'flex-row'}`}>
    <img onContextMenu={(e) => e.preventDefault()} src={songs[selectedIndex].album.images[0]?.url} className={`${!expanded ? 'block w-92 rounded mx-auto' : 'w-10 h-10 mr-3 rounded'}`} />
    <div>
      <p className="font-bold">{songs[selectedIndex].name}</p>
      <p className="text-gray-400">{songs[selectedIndex].artists[0].name}</p>
    </div>
   </div>
   <button onClick={toggleExpand} className={`${!expanded ? 'fixed top-4 left-4 text-2xl' : 'text-white text-xl mr-0'}`}>
    {expanded ? '▲' : '▼'}
    </button>
    </div>
      <div className="mt-4 select-none">
             <button
                className="bg-blue-500 p-2 mr-4 rounded"
                onClick={showPrevious}
                disabled={selectedIndex === 0}
              >
                Previous
              </button>
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
              <button
                className="ml-2 bg-blue-500 p-2 rounded"
                onClick={showNext}
                disabled={selectedIndex === songs.length - 1}
              >
                Next
              </button>
            </div>
        </div>
   </div>
      )}
    <Footer />
    </>
    )
}

export default Search 