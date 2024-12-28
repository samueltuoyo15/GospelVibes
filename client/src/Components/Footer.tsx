import {NavLink} from 'react-router-dom'
import {IoMdHome} from 'react-icons/io'
import {FaDoorOpen, FaSearch, FaSpotify} from 'react-icons/fa'
function Footer(){
  return(
    <aside onContextMenu={(e) => e.preventDefault()}
    className="text-sm md:text-2xl md:fixed md:h-full md:w-64 select-none shadow-2xl bg-black text-white fixed bottom-0 w-full p-4 flex md:flex-col justify-between md:justify-start md:items-start items-center"
    >
      <NavLink to="/" className="md:flex md:mb-4 md:justify-between md:items-center text-center">
        <IoMdHome className="inline md:mr-3"/>
        <span className="block md:inline-block">Home</span>
      </NavLink>
       <NavLink to="/search" className="md:mb-4 md:flex md:items-center md:justify-between text-center">
        <FaSearch className="inline md:mr-3"/>
        <span className="block">Search</span>
      </NavLink>
       <NavLink to="/libary" className="md:mb-4 md:flex md:items-center md:justify-between text-center">
        <FaDoorOpen className="inline md:mr-3"/>
        <span className="block">Your Libary</span>
      </NavLink>
       <NavLink to="/premium" className="md:mb-4 md:flex md:items-center md:justify-between text-center">
        <FaSpotify className="inline md:mr-3"/>
        <span className="block">Premium</span>
      </NavLink>
    </aside>
    )
}
export default Footer