import { chunk } from "stunk"
import { User } from "../types/User"


const defaultSong = {
  id: "",
  title: "",
  audioUrl: "",
  thumbnailUrl: "",
  duration: "",
  uploader: "",
}


const defaultUser: User = {
  id: "",
  name: "",
  email: "",
}

export const songsChunk = chunk<typeof defaultSong>(defaultSong)
export const userChunk = chunk<User>(defaultUser)