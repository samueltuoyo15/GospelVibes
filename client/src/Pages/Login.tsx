import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import styled, { keyframes } from 'styled-components'

interface LoginProps{
    setIsAuthenticated: (isAuthenticated: boolean) => void
}
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const Loader = styled.span`
  border: 4px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  border-top: 4px solid rgba(255, 255, 255, 1);
  width: 24px;
  height: 24px;
  animation: ${spin} 1s linear infinite;
  margin-right: 10px;
`

function Login({setIsAuthenticated}: LoginProps) {
  const [loading, setLoading] = useState<boolean>(false)
  const [name, setName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const navigate = useNavigate()
 
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try{
    const response = await fetch('/api/auth/register', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({email: email, password: password, name: name, }),
    })
    const data = await response.json()
     setIsAuthenticated(true)
     localStorage.setItem('isAuthenticated', 'true')
     localStorage.setItem('user', JSON.stringify(data.user))
      navigate('/')
      console.log(data)
    }
    catch(error){
      console.error(error)
    }
    finally{
      setLoading(false)
    }
  }

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4">
      <h1 className="text-5xl font-bold mb-6">Welcome to Gospel Beats</h1>
      <form onSubmit={handleSubmit}>
     
      <input type="text"
       placeholder="John Doe"
       onChange={(e) => setName(e.target.value)}
       className="border-2 rounded py-3 px-10 text-black" />
     
      <input type="password"
       placeholder="Your Password Here"
       onChange={(e) => setPassword(e.target.value)}
       className="border-2 mt-3 rounded py-3 px-10 text-black" />
      
       <input type="email"
       placeholder="johndoe@gmail.com"
       onChange={(e) => setEmail(e.target.value)}
       className="border-2 mt-3 mb-5 rounded py-3 px-10 text-black" />
       <button 
        type="submit"
        className="bg-green-600 hover:bg-green-650 rounded-lg px-10 py-3 text-3xl transition duration-300 flex items-center"
      >
        {loading ? (
          <>
            <Loader />
            Checking User Info...
          </>
        ) : (
          <>
            Create Account 
            <img src="/album.jpeg" alt="Spotify Logo" className="inline w-8 ml-2" />
          </>
        )}
      </button>
      </form>
    </section>
  )
}

export default Login
