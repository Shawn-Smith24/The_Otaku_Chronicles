import React from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'
const NavBar = () => {
    return (
        <nav className='navbar'>
            <Link to='/'>Otaku Chronicles</Link>
            <Link to='/blog'>Blog</Link>
            <Link to='/login'>Login</Link>
            <Link to='/signup'>Signup</Link>
            <Link to='/anime'>Anime</Link>
        </nav>
    )
}

export default NavBar