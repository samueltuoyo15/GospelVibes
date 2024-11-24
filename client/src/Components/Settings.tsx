import {useState} from 'react'
import {FaTimes} from 'react-icons/fa'
import {User} from '../types/User'

type HeaderProps = {
  user: User | null
}

const Settings = ({user}: HeaderProps) => {
  const [previewUrl, setPreviewUrl] = useState<null | string>('')
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if(file){
      const reader = new FileReader()
      reader.onloadend = () => {
      setPreviewUrl(reader.result as string)
    }
    reader.readAsDataURL(file)
    }
  }
  return(
     {user ? (
        <div className="fixed w-50 h-full z-50 flex items-center gap-2">
          <span className="inline">{user.name}</span>
          <input type="file" className="hidden z-10" accept="image/*" onChange={handleImageUpload} />
          <img
            onContextMenu={(e) => e.preventDefault()}
            src={previewUrl || user.profilePicture}
            className="rounded-full w-10 inline"
            alt="User Profile"
          />
        </div>
      ) : (
        <p>Please you are not logged in</p>
      )}
    )
}

export default Settings