import React from 'react'
import './NotFound.css'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='not-found'>
        <h2>Page Not Found 404</h2>
        <Link to='/'>Go Home</Link>
    </div>
  )
}

export default NotFound