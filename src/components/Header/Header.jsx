import React from 'react'
import './Header.css'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../files/gallary.png'
import Profile from '../../files/profile.jpg'
import { useInfoContext } from '../../context/InfoContext'

const Header = ({setRegister}) => {
  const {currentUser} = useInfoContext()
  return (
    <header>
      <Link to='/' className="logo">
        <img src={logo} alt="logo_site" />
      </Link>
      <nav className="navbar">
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink to='/' className="nav-link">Home</NavLink>
          </li>
          {currentUser && <li className="nav-item">
            <NavLink to='/my' className="nav-link">My Photos</NavLink>
          </li>}
          <li className="nav-item">
            <NavLink to='/pic' className="nav-link">Pictures</NavLink>
          </li>
         {!currentUser && <li className="nav-item">
            <div className="auth">
              <Link to='/auth' onClick={() => setRegister(true)} style={{textDecoration: 'none'}}>
                <span>Sign In</span>
              </Link>
              <Link to='/auth' onClick={() => setRegister(true)} style={{textDecoration: 'none'}}>
                <span className='sign'>Sign Up</span>
              </Link>
            </div>
          </li>}
        </ul>
      </nav>
        {currentUser && <div style={{borderRadius: '50%',border: '1px solid white', padding: '5px', cursor: 'pointer'}}>
          <Link to={currentUser ? '/account' : '/none'}>
            <img height={50} width={50} style={{objectFit: 'cover', borderRadius: '50%'}} src={currentUser?.profilePicture ? currentUser?.profilePicture.url : Profile} alt="profile_picture" />
          </Link>
        </div>}
    </header>
  )
}

export default Header