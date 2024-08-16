import React, { useState } from 'react'
import './Auth.css'
import logo from '../../files/gallary.png'
// import Google from '../../components/Google/Google'
import { toast } from 'react-toastify'
import hero from '../../files/hero.avif'
import {useInfoContext} from '../../context/InfoContext'
import { signUp, logIn } from '../../api/authRequests'

const Auth = () => {
  const {setCurrentUser} = useInfoContext()
  const [signIn, setSignIn] = useState(false)
  const [clicked, setClicked] = useState(false)

  const handleForm = async (e) => {
    e.preventDefault()
    setClicked(true)
    try {
      toast.loading('Please wait....')
      const dataUser = new FormData(e.target)
      const res = !signIn ? await logIn(dataUser) : await signUp(dataUser)
      toast.dismiss()
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_LEFT,
      });
      setClicked(false)
      setCurrentUser(res?.data.user)
      localStorage.setItem("profile", JSON.stringify(res?.data.user))
      localStorage.setItem("access_token", res?.data.token)
      window.location.replace('/')
      // setRegister(false)
    } catch (err) {
      setClicked(false)
      toast.dismiss()
      toast.error(err?.response?.data.message, {
        position: toast.POSITION.TOP_LEFT,
      });
    }
  }

  return (
    <div className='contianer'>
         <div className='form-box'>
      <form onSubmit={handleForm} action="">
        <div className="logo" style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
          <img src={logo} alt="logo_site" />
          <h2>{!signIn ? 'Login' : 'Sign Up'}</h2>
        </div>
        <div className="input-form">
          {signIn && <>
            <input type="text" name='firstname' placeholder='FirstName' required/>
            <input type="text" name='lastname' placeholder='Lastname' required/>
          </>}
          <input type="text" name='username' placeholder='Username' required/>
          <input type="password" name='password' placeholder='Password' required/>
        </div>
        <button style={{margin: '10px 0', color: 'blue', border: '1px solid blue'}} disabled={clicked}>{!signIn ? 'Login' : 'Sign Up'}</button>
        <button style={{margin: '10px 0', color: 'red', border: '1px solid red'}} disabled={clicked} onClick={() => {window.location.replace('/')}}>Go Home</button>
        <div className='or'>{signIn ? 'Already have an account?' : 'No Account?'}<span onClick={() => setSignIn(!signIn)}>{signIn ? 'Sign in' : 'Sign up'}</span></div>
        {/* <Google/> */}
      </form>
      <div className="image">
        <img src={hero} alt="image" />
      </div>
    </div>
    </div>
  )
}

export default Auth;