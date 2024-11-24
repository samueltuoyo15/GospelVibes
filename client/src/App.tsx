import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Home from './Pages/Home'
import Search from './Pages/Search'
import Login from './Pages/Login'
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
     <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />}/>
     <Route path="/search" element={isAuthenticated ? <Search /> : <Navigate to="/login" />}/>
     <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated}/>} />
      </Routes>
    </Router>
  )
}

export default App
