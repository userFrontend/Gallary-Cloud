import React, { useEffect, useRef, useState } from 'react'
import { useInfoContext } from '../../context/InfoContext'
import { addProd } from '../../api/addRequests'
import './MyPhotos.css'
import { toast } from 'react-toastify'
import Modal from '../../components/Modal/Modal'
import Dropdown from '../../components/Dropdown/Dropdown'
import { Link } from 'react-router-dom'
import Loader from '../../components/Loader/Loader'

const MyPhotos = () => {
    const {gallarys, currentUser, toggleReset, setGetPictures} = useInfoContext()
    const [add, setAdd] = useState(false)
    const [addPict, setAddPict] = useState(false)
    const [openPict, setOpenPict] = useState(false)
    const [click, setClick] = useState(false)
    const [pic, setPic] = useState(false)
    const [currentGall, setCurrentGall] = useState([])

    const toggle = () => setAdd(!add)
    const togglePic = () => setAddPict(!addPict)
    const cameraPic = () => setOpenPict(!openPict)

    useEffect(() =>{
        if(gallarys.length > 0){
            const gallData = gallarys.filter(gallary => gallary?.userId === currentUser?._id)
            setCurrentGall(gallData)
        } else {
            toast.dismiss()
            toast.loading('Please wiat...')
            setTimeout(()=>{
                toast.dismiss()
            }, 2000)
        }
    },[gallarys])

    const addFile = async (e) => {
        e.preventDefault()
        setClick(true)
        try {
            const data = new FormData(e.target)
            data.append('userId', currentUser._id)
            const res = await addProd(data, {method: 'gallary'})
            toast.dismiss()
            toast.success(res.data.message)
            setAdd(false)
            toggleReset()
            setClick(false)
            e.target.reset()
        } catch (err) {
            setClick(false)
            toast.dismiss()
            toast.error(err.response.data.message)
        }
    }
    const addPic = async (e) => {
        e.preventDefault()
        setClick(true)
        try {
            const data = new FormData(e.target)
            data.append('private', pic)
            data.append('userId', currentUser._id)
            const res = await addProd(data, {method: 'picture'})
            toast.dismiss()
            toast.success(res.data.message)
            toggleReset()
            setClick(false)
            togglePic()
            e.target.reset()
        } catch (err) {
            setClick(false)
            toast.dismiss()
            toast.error(err.response.data.message)
        }
    }

const videoRef = useRef(null);
const canvasRef = useRef(null)
const imageRef = useRef(null)



// Get access to the camera!
useEffect(()=>{
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && videoRef.current) {
        navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
        });
    }
},[openPict])


// Trigger photo take
const snap = () => {
    if (canvasRef.current) {
        const context = canvasRef.current.getContext('2d');
        context.drawImage(videoRef.current, 0, 0, 90, 60);
        const image = context.getImageData(0, 0, 90, 60)
        const dataURI = canvasRef.current.toDataURL()
        console.log(dataURI);
      }
};

const checkImg = (e) => {
    e.preventDefault()
    let image = canvasRef.current.toDataURL('image/png')
    imageRef.current = image
}

  return (
    <div style={{marginTop: '150px'}}>
       <div className="container">
        <div style={{display: 'flex', gap: '30px'}}>
        <button className='add-photo' onClick={toggle}>Add New File +</button>
       <div className="add_dropdown">
            <input type="checkbox" id="dropdown"/>

            <label className="dropdown__face" htmlFor="dropdown">
                <div className="dropdown__text">Add Photo + </div>

                {/* <div className="dropdown__arrow"></div> */}
            </label>

            <ul className="dropdown__items">
                <li onClick={cameraPic} >📸 Camera</li>
                <li onClick={togglePic} >📂 File</li>
            </ul>
        <svg>
        <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
        </filter>
        </svg>
        </div>
        </div>
        <div className="gallary-box">
            {add && <div className="file">
                <div className="file-top">
                    <span><b style={{color: '#f9532d'}}>0</b> files</span>
                    <b onClick={toggle}>X</b>
                </div>
                <div className="img-box">
                </div>
                <form onSubmit={addFile} action="">
                    <input maxLength={15} type="text" name='title' placeholder='File name' required/>
                    <button>Add</button>
                </form>  
            </div>}
            {currentGall.length > 0 ? currentGall.map(gallary => {
                if(gallary?.userId === currentUser?._id){
                   return (
                    <div key={gallary._id}>
                        <div className="file">
                            <div className="file-top">
                                <span><b style={{color: '#f9532d'}}>{gallary?.pictures?.length}</b> files</span>
                                <Dropdown result={gallary} method={'gallary'}/>
                            </div>
                            <div className="img-box" onClick={() => {setGetPictures(gallary?.pictures)}}>
                                {gallary?.pictures?.length > 0 ? gallary?.pictures.map(res => {
                                    return <Link key={res._id} to={`/pic/${gallary._id}`}><img src={res.picture.url} alt="image" /></Link>
                                }) : <i>No picture</i>}
                            </div>
                            <h2>{gallary.title}</h2>
                        </div>
                    </div>
                   )
                } 
            }) : <div style={{margin: '0 auto'}}><h2>Iltimos Birinchi rasm uchun fayl qoshing</h2></div>}
            
        </div>  
        {addPict && <Modal closeFunction={togglePic}>
            <form style={{zIndex: '9999'}} onSubmit={addPic} action="" className='picture-form'>
            <div className="input">
                <b>Select Name image</b>
                <input type="text" name='title' required placeholder='Title'/>
            </div>
            <div className="input">
                <b>Select picture</b>
                <input type="file" name='image' required />
            </div>
            <div className="input">
                <b>Select File</b>
                <select name='gallaryId' required>
                {gallarys.length > 0 && gallarys.map(gallary => {
                      if(currentUser._id === gallary.userId){
                        return <option key={gallary._id} value={gallary._id}>{gallary.title}</option>
                      } else {
                        return <option key={gallary._id} disabled>No File</option>
                      }
                    })}
                </select>
            </div>
            <div className="input">
                <b><span style={{color: '#f9532d'}}>Private</span> image is visible only to you</b>
                <div className='prev' style={pic ? {backgroundColor: 'dodgerblue'} : {}} onClick={() => setPic(!pic)}>
                    {pic? 
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
                <button disabled={click}>Add Picture</button>
                <button style={{backgroundColor: 'white', color: '#f9532f'}} onClick={togglePic} disabled={click}>Close</button>
            </form>
        </Modal>}
        {openPict &&
        <div className="camera">
            <div className="my-form">
                <form onSubmit={checkImg} action="">
                    <img src={imageRef?.current} alt="photo" />
                    <input type="hiddin" ref={imageRef} value={imageRef?.current}/>
                    <button>Close</button>
                    <button>Save</button>
                </form>
            </div>
            <div className="cameraApp">
                <div className="topBar">
                    <div className="camIco flash">
                        <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                        <path d="M41 6L13 34h14.187L23 58l27.998-29.999H37L41 6z"></path>
                        </svg>
                    </div>
                    <div className="camIco chevronUp">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                            <path d="M20 40l11.994-14L44 40"></path>
                        </svg>
                    </div>
                    <div className="camIco circles">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                            <path d="M45 32a17 17 0 0 1-9.8 5.7M22 34.8a17 17 0 1 1 26.2-8.5"></path>
                            <path d="M15.8 26.3a17 17 0 1 1-5.8 2.3"></path>
                            <path d="M32 54a17 17 0 0 1-3.3-16m3.3-6a17 17 0 1 1 6 26.5"></path>
                        </svg>
                    </div>
                </div>
                <div className="cameraArea">
                    <video ref={videoRef} id="video" autoPlay muted></video>
                </div>
                <div className="obturadorArea">
                <div className="imgPreview">
                    <canvas ref={canvasRef}  id="canvas"></canvas>
                </div>
                <div onClick={snap} id="snap" className="obturador"></div>
                <div className="toggleCam">
                    <div onClick={cameraPic} className="camIco">
                        X
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                            <path d="M54.741 28.14a23.002 23.002 0 0 1-39.088 19.124"></path>
                            <path d="M9.065 33.62A23.008 23.008 0 0 1 31.917 8a22.934 22.934 0 0 1 16.262 6.732"></path>
                            <path d="M2 24l7.065 9.619L18 26"></path>
                            <path d="M62 38l-7.259-9.86L46 36"></path>
                        </svg>
                    </div>
                </div>
                </div>
            </div>
        </div>
        }
       </div>
    </div>
  )
}

export default MyPhotos