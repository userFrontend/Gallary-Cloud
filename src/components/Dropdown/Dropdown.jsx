import React, { useState } from 'react'
import './Dropdown.css'
import { toast } from 'react-toastify'
import { delProd } from '../../api/deleteRequests'
import { updateProd } from '../../api/updateRequests'
import Modal from '../Modal/Modal'
import { useInfoContext } from '../../context/InfoContext'

const Dropdown = ({result, method}) => {
  const {gallarys, currentUser, toggleReset, setId, id} = useInfoContext()
  const [click, setClick] = useState(false)
  const [pic, setPic] = useState(false)
  const [update, setUpdate] = useState(false)
  const [delPict, setDelPict] = useState(false)
  const toggleDel = () => setDelPict(!delPict)
  const toggleUpdate = () => setUpdate(!update)

  const deleteElement = async () => {
    setClick(true)
    try {
      const res = await delProd(id, {method})
      toast.dismiss()
      toast.success(res.data.message)
      toggleReset()
      setClick(false)
      toggleDel()
      setId(null)
    } catch (err) {
      setClick(false)
      toast.dismiss()
      toast.error(err.response.data.message)
    }
  }

  const updateElement = async (e) => {
    e.preventDefault()
    setClick(true)
    try {
      const data = new FormData(e.target)
      data.append('private', pic)
      const res = await updateProd(id, data, {method})
      toast.dismiss()
      toast.success(res.data.message)
      toggleReset()
      toggleUpdate()
      setClick(false)
      setId(null)
    } catch (err) {
      setClick(false)
      toast.dismiss()
      toast.error(err.response.data.message)
    }
  }

  return (<>
    <div className="dropdown">
        <button className="dropbtn">-:::-</button>
        <div className="dropdown-content">
            <div className="edit">
            <button className='menu' onClick={() => {setId(result._id); toggleDel()}}>
            <lord-icon
              src="https://cdn.lordicon.com/drxwpfop.json"
              trigger="hover"
              colors="primary:#121331,secondary:#f9532d"
              style={{width:"25px", height:"25px"}}>
            </lord-icon>
            </button>
            <button onClick={() => {toggleUpdate(); if(result.private){
              setPic(true)
            }else{
              setPic(false)
            }}}>
            <lord-icon
              src="https://cdn.lordicon.com/wuvorxbv.json"
              trigger="hover"
              colors="primary:#121331,secondary:#f9532d"
              style={{width:"25px", height:"25px"}}>
            </lord-icon>
            </button>
            <button>
            <lord-icon
              src="https://cdn.lordicon.com/rehjpyyh.json"
              trigger="hover"
              colors="primary:#121331,secondary:#f9532d"
              style={{width:"25px", height:"25px"}}>
            </lord-icon>
            </button>
            </div>
        </div>
    </div>
    {update && method === 'picture' && <Modal closeFunction={toggleUpdate}>
            <form style={{zIndex: '9999', color: 'white'}} onSubmit={updateElement} action="" className='picture-form'>
            <div className="input">
                <b>Update Name image</b>
                <input type="text" name='title' placeholder='Title' defaultValue={result.title}/>
            </div>
            <div className="input">
                <b>Update picture</b>  
                <input type="file" name='image' />
            </div>
            <div className="input">
                <b>Update File</b>
                <select name='gallaryId'>
                    {gallarys.length > 0 && gallarys.map(gallary => {
                      if(currentUser._id === gallary.userId){
                        return <option key={gallary._id} value={gallary._id}>{gallary.title}</option>
                      } else {
                        return <option disabled>No File</option>
                      }
                    })}
                </select>
            </div>
            <div className="input">
                <b><span style={{color: '#f9532d'}}>Private</span> image is visible only to you</b>
                <div className='prev' style={pic ? {backgroundColor: 'dodgerblue'} : {}} onClick={() => setPic(!pic)}>
                    {pic ? 
                    <lord-icon
                        src="https://cdn.lordicon.com/cgzlioyf.json"
                        trigger="hover"
                        colors="primary:#ffffff,secondary:#f9532d"
                        style={{width:"50px", height:"50px"}}>
                    </lord-icon>
                    :<lord-icon
                        src="https://cdn.lordicon.com/khheayfj.json"
                        trigger="hover"
                        colors="primary:#ffffff,secondary:#f9532d"
                        style={{width:"50px", height:"50px"}}>
                    </lord-icon>}
                </div>
            </div>
                <button onClick={() => setId(result._id)} disabled={click}>Update Picture</button>
                <button style={{backgroundColor: 'white', color: '#f9532f'}} onClick={toggleUpdate} disabled={click}>Close</button>

            </form>
        </Modal>}
          {update && method === 'gallary' && <Modal closeFunction={toggleUpdate}>
          <form onSubmit={updateElement} action="">
              <input maxLength={15} type="text" name='title' placeholder='File name'/>
              <button onClick={() => setId(result._id)} disabled={click}>Update</button>
              <button style={{backgroundColor: 'white', color: '#f9532f'}} onClick={toggleUpdate} disabled={click}>Close</button>

          </form>  
        </Modal>}
        {delPict && <Modal closeFunction={toggleDel}>
            <div className="del-body">
              <b>Are you sure you want to delete it?</b>
              <div className="del-button">
                <button  style={{backgroundColor: 'red'}} onClick={deleteElement}>Delete</button>
                <button style={{backgroundColor: 'gray'}} onClick={toggleDel}>Close</button>
              </div>
            </div>
        </Modal>}
  </>
  )
}

export default Dropdown