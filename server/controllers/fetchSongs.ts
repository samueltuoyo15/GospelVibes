import { Request, Response } from "express"
import { exec } from "child_process"

interface songDetailsInterface {
  title: string;
  audioUrl: string;
  thubnailUrl: string;
  duration: string;
  uploader: string;
}

export const fetchSongs = async (req: Request, res: Response): Promise<any>=> {
  try{
  const searchTerms = ["latst gospel worship songs 2025", "latest gospel praise songs 2025", "latest gospel chants 2025"]
  
  const pickRandomTerm = searchTerms[Math.floor(Math.random() * searchTerms.length)] 
  const command = `yt-dlp "yt-search1:${pickRandomTerm}" -j --no-playlist --extract-audio --audio-format mp3`
  
  exec(command, (error, stdout, stderr) => {
    if(error){
      console.error("Error executing yt-dlp command", stderr)
      res.status(500).json({message: "Failed to fetch songs"})
      return 
    }
    
    const data = JSON.parse(stdout)
    
    const songDetails: songDetailsInterface = {
      title: data.title,
      audioUrl: data.url,
      thubnailUrl: data.thumbnail,
      duration: data.duration_string,
      uploader: data.uploader
    }
    
    res.status(200).json(songDetails)
    console.table(songDetails)
  })
  } catch(error){
    console.error("Failed to fetch songs", error)
    res.status(500).json({message: "Failed to fetch songs"})
  }
}

