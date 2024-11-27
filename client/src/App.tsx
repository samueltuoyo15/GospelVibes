import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Home from './Pages/Home'
import Search from './Pages/Search'
import SignUp from './Pages/SignUp'
import Login from './Pages/Login'
import Premium from './Pages/Premium'
import NotFoundPage from './Pages/NotFoundPage'
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => localStorage.getItem('isAuthenticated') === 'true')
  useEffect(() => {
    const Status = localStorage.getItem('isAuthenticated')
    setIsAuthenticated(Status === 'true')
  },[])
  useEffect(() => {
  const handleOffline = () => {
    alert('Device is offline');
  };

  window.addEventListener('offline', handleOffline);

  return () => {
    window.removeEventListener('offline', handleOffline);
  };
}, []);
  return (
    <Router>
      <Routes>
     <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/signup" />}/>
     <Route path="/search" element={isAuthenticated ? <Search /> : <Navigate to="/signup" />}/>
     <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated}/>} />
     <Route path="/signup" element={<SignUp setIsAuthenticated={setIsAuthenticated}/>} />
     <Route path="/premium" element={<Premium />} />
     <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  )
}

export default App
