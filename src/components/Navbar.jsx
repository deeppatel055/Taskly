import React from 'react'
import { FaSearch } from "react-icons/fa";

const Navbar = ({searchTodo, setSearchTodo}) => {
  
  return (

    <nav className='nav'>
        <div className='nav-name'>
            <h2>To Do</h2>
        </div>
        <div className='search-box'>
            <span className='search-icon'><FaSearch /></span>
            <input type="text" value={searchTodo} onChange={(e) => setSearchTodo(e.target.value)} placeholder='Search you Notes'/>
        </div>
        
    </nav>
  )
}

export default Navbar
