import {NavLink} from 'react-router-dom'
import {IoMdHome} from 'react-icons/io'
import {FaDoorOpen, FaSearch, FaSpotify} from 'react-icons/fa'
function Footer(){
  return(
    <footer onContextMenu={(e) => e.preventDefault()} className="text-sm select-none shadow-2xl bg-black text-white fixed bottom-0 w-full p-4 flex justify-between items-center">
      <NavLink to="/" className="text-center">
        <IoMdHome className="inline text-lg"/>
        <span className="block">Home</span>
      </NavLink>
       <NavLink to="/search" className="text-center">
        <FaSearch className="inline text-lg"/>
        <span className="block">Search</span>
      </NavLink>
       <NavLink to="/" className="text-center">
        <FaDoorOpen className="inline text-lg"/>
        <span className="block">Your Libary</span>
      </NavLink>
       <NavLink to="/premium" className="text-center">
        <FaSpotify className="inline text-lg"/>
        <span className="block">Premium</span>
      </NavLink>
    </footer>
    )
}
export default Footer