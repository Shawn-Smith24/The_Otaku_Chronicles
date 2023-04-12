import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './NavBar.css'


function Navbar ({user, onLogout}) {
    
    let navigate = useNavigate()
  
    function redirectHome() {
        navigate('/characters')
    }
  
    function handleLogout() {
      fetch("/logout", {
        method: "DELETE",
      }).then(() => {
        onLogout()
        redirectHome()
      });
    }

  return (
      <nav className="navbar">
          <div className='links'>
              <Link to='/'>The Otaku Chronicles</Link>
              <Link to='/mangas'>Mangas</Link>
              <Link to='/characters'>Characters</Link>
              <Link to='/addanime'>New Anime</Link>
              <Link to='/anime' 
              >Anime</Link>
              <Link to='/blog' 
              >Blog</Link>
              <Link to='/addpost'>New Post</Link>
              <Link to='/profile' 
              >Profile</Link>
              {user ?
                  <Link to="/logout">
                      <button className="NavBarButton" onClick={handleLogout}>Logout</button>
                  </Link>
                  : ''
              }
          </div>
      </nav>
  )
}
export default Navbar