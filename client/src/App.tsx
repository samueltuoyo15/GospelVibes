import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Home from './Pages/Home'
import Search from './Pages/Search'
import SignUp from './Pages/SignUp'
import Login from './Pages/Login'
import Libary from './Pages/Libary'
import NotFoundPage from './Pages/NotFoundPage'
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => localStorage.getItem('isAuthenticated') === 'true')
  useEffect(() => {
    const Status = localStorage.getItem('isAuthenticated')
    setIsAuthenticated(Status === 'true')
  },[])

  return (
    <Router>
      <Routes>
     <Route path="/" element={<Home />}/>
     <Route path="/search"
     element={isAuthenticated ? <Search /> : <Login setIsAuthenticated={setIsAuthenticated}/>} 
     />
     
     <Route path="/login"
     element={<Login setIsAuthenticated={setIsAuthenticated}/>} 
     />
     
     <Route path="/signup" 
     element={<SignUp setIsAuthenticated={setIsAuthenticated}/>} 
     />
     
     <Route path="/libary" 
     element={isAuthenticated ? <Libary/> : <Login setIsAuthenticated={setIsAuthenticated}/> } 
     />
    
     
     <Route path="*" 
     element={<NotFoundPage />}
     />
      </Routes>
    </Router>
  )
}

export default App
