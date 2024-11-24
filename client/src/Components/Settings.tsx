import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import axios from 'axios'
import { User } from '../types/User'

type SettingsProps = {
  user: User | null
  closeSettings: () => void
}

type ServerResponse = {
  profilePicture: string
}

const Settings = ({ user, closeSettings }: SettingsProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)

      const formData = new FormData()
      formData.append('image', file)

      try {
        setIsUploading(true)
        const response = await axios.post<ServerResponse>('/api/users/updateprofilepicture', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        setPreviewUrl(response.data.profilePicture)
      } catch (error) {
        console.error('Error uploading image:', error)
      } finally {
        setIsUploading(false)
      }
    }
  }

  const handleFileInputClick = () => {
    document.getElementById('imageInput')?.click()
  }

  return user ? (
    <div className="fixed top-0 right-0 bg-black w-full h-full z-50 shadow-lg p-4 transition-transform transform translate-x-0">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">Settings</h3>
        <button onClick={closeSettings} className="text-red-500">
          <FaTimes size={20} />
        </button>
      </div>
      <div className="mt-4 flex flex-col items-center gap-4">
        <div
          onClick={handleFileInputClick}
          className={`cursor-pointer ${isUploading ? 'opacity-50' : ''}`}
        >
          <img
            src={previewUrl || user.profilePicture}
            alt="User Profile"
            className="w-20 h-20 rounded-full border"
          />
        </div>
        <input
          id="imageInput"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleImageUpload}
        />
        <p className="text-sm text-white">Click the image to change your profile picture</p>
      </div>
    </div>
  ) : (
    <p className="text-white">Please you are not logged in</p>
  )
}

export default Settings
