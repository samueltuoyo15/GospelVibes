import { Request, Response } from "express"
import { exec } from "child_process"

interface SongDetailsInterface {
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
    const command = `yt-dlp "ytsearch30:${pickRandomTerm}" -j --no-playlist --extract-audio --audio-format mp3`

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error("Error executing yt-dlp command", stderr)
        return res.status(500).json({ message: "Failed to fetch songs" })
      }

      const data = stdout.trim().split("\n").map(line => JSON.parse(line))

      const songs: SongDetailsInterface[] = data.map(song => ({
        title: song.title,
        audioUrl: song.url,
        thumbnailUrl: song.thumbnail,
        duration: song.duration_string,
        uploader: song.uploader
      }))

      res.status(200).json(songs)
    })
  } catch (error) {
    console.error("Failed to fetch songs", error)
    res.status(500).json({ message: "Failed to fetch songs" })
  }
}