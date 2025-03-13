import { Request, Response } from "express"
import { exec } from "child_process"

interface SongDetailsInterface {
  id: string 
  title: string
  audioUrl: string
  thumbnailUrl: string
  duration: string
  uploader: string
}

export const fetchSongs = async (req: Request, res: Response) => {
  try {
    const searchTerms = [
      "latest gospel worship songs 2025",
      "latest gospel praise songs 2025",
      "latest gospel chants 2025"
    ]

    const pickRandomTerm = searchTerms[Math.floor(Math.random() * searchTerms.length)]
    const command = `yt-dlp "ytsearch1:${pickRandomTerm}" -j --no-playlist --extract-audio --audio-format mp3`

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error("Error executing yt-dlp command", stderr)
        return res.status(500).json({ message: "Failed to fetch songs" })
      }

      const data = JSON.parse(stdout)
      console.log(data)
      const songs: SongDetailsInterface = {
        id: data.id,
        title: data.title,
        audioUrl: data.url,
        thumbnailUrl: data.thumbnail || "",
        duration: data.duration_string,
        uploader: data.uploader
      }

      res.status(200).json(songs)
    })
  } catch (error) {
    console.error("Failed to fetch songs", error)
    res.status(500).json({ message: "Failed to fetch songs" })
  }
}