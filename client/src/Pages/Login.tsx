import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

interface LoginProps {
  setIsAuthenticated: (isAuthenticated: boolean) => void
}



function Login({ setIsAuthenticated }: LoginProps) {
  const [loading, setLoading] = useState<boolean>(false)
  const [password, setPassword] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMessage('')
     if (!email) {
    return setErrorMessage('Email is required 😌');
    }
   if (!password) {
    return setErrorMessage('Password cannot be empty 🥲');
   }
    setLoading(true)
    setErrorMessage('')  

    try {
      const response = await fetch(import.meta.env.VITE_LOGIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {  
        throw new Error(data.message || 'Something went wrong!')
        setErrorMessage(data.message)
      }

      setIsAuthenticated(true)
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('user', JSON.stringify(data.user))
      localStorage.setItem('token', data.token)
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
      <h1 className="text-5xl font-bold mb-6">Welcome Back</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email" className="block text-left w-full">Email: </label>
        <input
          id="email"
          type="email"
          placeholder="johndoe@gmail.com"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full block border-2 mt-3 mb-3 rounded py-3 px-10 text-black"
        />
        <label htmlFor="password" className="block mt-3 text-left w-full">Password:</label>
        <input
          id="password"
          type="password"
          placeholder="Your Password Here"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full block border-2 mt-3 mb-3 rounded py-3 px-10 text-black"
        />
        {errorMessage && (
        <p className="text-sm text-red-700">
          {errorMessage}
        </p>
      )}
        <button
          type="submit"
          className="flex justify-center items-center text-center w-full bg-green-600 hover:bg-green-650 rounded-lg px-10 py-3 text-3xl transition duration-300 flex items-center"
        >
          {loading ? (
            <>
              
              Checking User Info...
            </>
          ) : (
            <>
              Login
              <img src="/album.jpeg" alt="Spotify Logo" className="inline w-8 ml-2" />
            </>
          )}
        </button>
        <p className="text-white text-2xl  mt-5">Dont have an account yet? <Link to="/signup" className="text-blue-800">SignUp</Link></p>
      </form>
 </section>
  )
}

export default Login