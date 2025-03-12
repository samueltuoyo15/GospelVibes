import { Request, Response } from "express"
import { exec } from "child_process"

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
  })
  } catch(error){
    console.error(error)
  }
}