import React, { useState } from 'react'
import './Account.css'
import { useInfoContext } from '../../context/InfoContext'
import defaultImg from '../../files/profile.jpg'
import { toast } from 'react-toastify'
import { updateProd } from '../../api/updateRequests'
import Modal from '../../components/Modal/Modal'
import { delProd, deleteUser } from '../../api/deleteRequests'

const Account = () => {
  const {exit, currentUser, setCurrentUser} = useInfoContext()
  const [uptUser, setUptUser] = useState(false)
  const [click, setClick] = useState(false)
  const [delAcc, setDelAcc] = useState(false)

  const toggleUpd = () => setUptUser(!uptUser)
  const toggleDel = () => setDelAcc(!delAcc)

  const handleUpdate = async (e) => {
    e.preventDefault()
    setClick(true)
    try {
      const data = new FormData(e.target)
      const res = await updateProd(currentUser._id, data, {method: 'user'})
      setCurrentUser(res?.data?.user)
      localStorage.setItem("profile", JSON.stringify(res?.data?.user))
      toast.dismiss()
      toast.success(res.data.message)
      setClick(false)
      toggleUpd()
    } catch (err) {
      setClick(false)
      toast.dismiss()
      toast.error(err.response.data.message)
    }
  }
  const deleteAccount = async (e) => {
    e.preventDefault()
    setClick(true)
    try {
      const data = new FormData(e.target)
      console.log(data.get('confirm'));
      if(data.get('confirm') == 'I confirm the deletion of the account'){
        const res = await delProd(currentUser._id, {method: 'user'})
        toast.dismiss()
        toast.success(res.data.message)
        setClick(false)
        toggleDel()
        exit()
      } else {
        setClick(false)
        toast.dismiss()
        toast.warning('Confirm wrong !')
      }
    } catch (err) {
      setClick(false)
      toast.dismiss()
      toast.error(err.response.data.message)
    }
  }

  return (
    <div className="container">
      <div className='accout'>
      <div className="profile-box">
        <img src={currentUser?.profilePicture ? currentUser?.profilePicture.url : defaultImg} alt="" />
        <div className="information">
          <b style={{color: '#f9532d'}}>Your full name:</b>
          <h2>{currentUser.firstname} {currentUser.lastname}</h2>
          <b style={{color: '#f9532d'}}>Your Username (Login):</b>
          <h3>{currentUser.username}</h3>
        </div>
        <div className="edit">
        <button onClick={toggleDel}>
        <lord-icon
          src="https://cdn.lordicon.com/vistbkts.json"
          trigger="hover"
          colors="primary:#121331,secondary:#f9532d"
          style={{width:"50px", height:"50px"}}>
        </lord-icon>
        <b>Delete</b>
        </button>
        <button onClick={toggleUpd}>
        <lord-icon
          src="https://cdn.lordicon.com/ghhwiltn.json"
          trigger="hover"
          colors="primary:#121331,secondary:#f9532d"
          style={{width:"50px", height:"50px"}}>
        </lord-icon>
        <b>Update</b>
        </button>
        <button onClick={exit}>
        <lord-icon
          src="https://cdn.lordicon.com/gwvmctbb.json"
          trigger="hover"
          colors="primary:#121331,secondary:#f9532d"
          style={{width:"50px", height:"50px"}}>
        </lord-icon>
        <b>Log Out</b>
        </button>
        </div>
      </div>
      {uptUser && <Modal closeFunction={toggleUpd}>
            <form style={{zIndex: '9999'}} onSubmit={handleUpdate} action="" className='picture-form'>
              <div className="input">
                  <b>Update firstname</b>
                  <input defaultValue={currentUser.firstname} type="text" name='firstname' />
              </div>
              <div className="input">
                  <b>Update lastname</b>
                  <input defaultValue={currentUser.lastname} type="text" name='lastname' />
              </div>
              <div className="input">
                  <b>Update firstname</b>
                  <input defaultValue={currentUser.username} type="text" name='username' />
              </div>
              <div className="input">
                  <b>Update Profile Image</b>
                  <input type="file" name='image' />
              </div>
              <div className="input">
                  <b>Update Password</b>
                  <input type="password" name='password' placeholder="It's not required"/>
              </div>
              <button disabled={click}>Update</button>
              <button style={{backgroundColor: 'white', color: '#f9532f'}} onClick={toggleUpd} disabled={click}>Close</button>
            </form>
        </Modal>}
        {delAcc && <Modal closeFunction={toggleDel}>
          <form className='del-form' action="" onSubmit={deleteAccount}>
            <h2>Please enter confirmation to delete accout</h2>
            <h5><span style={{fontWeight: 'bold', marginRight: '10px'}}>Confirm word:</span><span style={{color: 'red', fontWeight: 'bold', backgroundColor: 'white', padding: '5px'}}>I confirm the deletion of the account</span></h5>
            <input type="text" name='confirm' placeholder='Enter Confirm'/>
            <button>Delete Accout</button>
            <button type='button' style={{backgroundColor: 'white', color: '#f9532d'}} onClick={toggleDel}>Close</button>
          </form>
          </Modal>}
    </div>
    </div>
  )
}

export default Account