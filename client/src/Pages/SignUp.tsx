import { useState } from 'react'
import { useNavigate, Link} from 'react-router-dom'
import styled, { keyframes } from 'styled-components'

interface LoginProps {
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

function SignUp({ setIsAuthenticated }: LoginProps) {
  const [loading, setLoading] = useState<boolean>(false)
  const [name, setName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')  
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMessage('')
    if (!name) {
    return setErrorMessage('Please pick a name 😌🥲');
    }
    if (!email) {
    return setErrorMessage('Email is required 😌');
    }
    if (!password) {
    return setErrorMessage('Password cannot be empty 🥲');
    }   
    
    setLoading(true)
    setErrorMessage('')  

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      })

      const data = await response.json()

      if (!response.ok) {  
        throw new Error(data.message || 'Something went wrong!')
        setErrorMessage(data.message)
      }

      setIsAuthenticated(true)
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('user', JSON.stringify(data.user))
      navigate('/')
    } catch (error: any) {
      setErrorMessage(error.message)  
      console.error('Login error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="flex flex-col items-center text-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4">
      <h1 className="text-5xl font-bold mb-6">Welcome to Gospel Beats</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name" className="block text-left w-full">Name:</label>
        <input
         id="name"
          type="text"
          placeholder="John Doe"
          onChange={(e) => setName(e.target.value)}
          className="w-full block border-2 rounded py-3 px-10 text-black"
        />
        <label htmlFor="password" className="block mt-3 text-left w-full">Password:</label>
        <input
          id="password"
          type="password"
          placeholder="Your Password Here"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full block border-2 mt-3 rounded py-3 px-10 text-black"
        />
        <label htmlFor="email" className="text-left w-full block mt-3">Email:</label>
        <input
          id="email"
          type="email"
          placeholder="johndoe@gmail.com"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full block border-2 mt-3 mb-5 rounded py-3 px-10 text-black"
        />
        {errorMessage && (
        <p className="text-sm text-red-700">
          {errorMessage}
        </p>
      )}
        <button
          type="submit"
          className="w-full text-center flex items-center justify-center bg-green-600 hover:bg-green-650 rounded-lg px-10 py-3 text-3xl transition duration-300 flex items-center"
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
      <p className="text-2xl text-white mt-7">Dont have an account yet? <Link to="/login" className="text-blue-800">Login</Link></p>
      </form>
   </section>
  )
}

export default SignUp