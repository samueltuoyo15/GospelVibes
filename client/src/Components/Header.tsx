import { useState, useEffect } from 'react'
import { User } from '../types/User'
import Settings from '../Components/Settings'

type HeaderProps = {
  user: User | null
}

function Header({ user }: HeaderProps) {
  const [period, setPeriod] = useState<string>('')
  const [showSettings, setShowSettings] = useState<boolean>(false)

  useEffect(() => {
    const updatePeriod = () => {
      const date = new Date()
      const hours = date.getHours()

      if (hours >= 18) {
        setPeriod('Good Evening')
      } else if (hours >= 12) {
        setPeriod('Good Afternoon')
      } else if (hours >= 6) {
        setPeriod('Good Morning')
      } else {
        setPeriod('Good Night')
      }
    }
    updatePeriod()
    const intervalId = setInterval(updatePeriod, 1000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <header className="select-none p-4 text-white flex justify-between items-center bg-gradient-to-r from-purple-500 to-blue-500">
      <h2 className="text-xl font-semibold">{period}</h2>
      {user ? (
        <div className="flex items-center gap-2">
          <span className="inline">{user.username || 'User'}</span>
          <img
            onClick={() => setShowSettings(!showSettings)}
            src={user.profilePicture || '/default-profile.png'}
            className="rounded-full w-10 inline cursor-pointer"
            alt="User Profile"
          />
        </div>
      ) : (
        <p>Please you are not logged in</p>
      )}
      {showSettings && (
        <Settings user={user} closeSettings={() => setShowSettings(false)} />
      )}
    </header>
  )
}

export default Header
