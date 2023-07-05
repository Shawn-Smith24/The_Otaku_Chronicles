import React, {useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../UserContext'



function Navbar () {
    const [user, setUser] = useContext(UserContext)  

    let navigate = useNavigate()
  
    function redirectHome() {
        navigate('/characters')
    }
  
    function handleLogout() {
      fetch("/logout", {
        method: "DELETE",
      }).then(() => {
       setUser(null)
        redirectHome()
      });
    }

  return (
      <nav className='flex sticky top-0 z-50 justify-center bg-[#000300]  w-full text-3xl items-center max-w-[2040px] font-bold text-white '>
          <div className='flex'>
              <Link to='/' className='p-4 hover:text-[#beef00]  '>The Otaku Chronicles</Link>
              <Link to='/mangas' className='p-4 hover:text-[#beef00] '>Mangas</Link>
              <Link to='/characters' className='p-4 hover:text-[#beef00]'>Characters</Link>
              <Link to='/anime' className='p-4 hover:text-[#beef00]'
              >Anime</Link>
              <Link to='/blog' className='p-4 hover:text-[#beef00]'
              >Blog</Link>
              <Link to='/addnew' className='p-4 hover:text-[#beef00]'>Add New</Link>
              <Link to='/profile' className='p-4 hover:text-[#beef00]'
              >Profile</Link>
              {user ?
                  <Link to="/logout" className='flex hover:text-[#beef00]'>
                      <button className="p-4 hover:text-[#beef00]" onClick={handleLogout}>Logout</button>
                  </Link>
                  : ''
              }
          </div>
      </nav>
  )
}
export default Navbar