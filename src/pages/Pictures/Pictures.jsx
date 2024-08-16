import React, { useEffect, useState } from 'react'
import './Pictures.css'
import { useInfoContext } from '../../context/InfoContext'
import Dropdown from '../../components/Dropdown/Dropdown'
import Loader from '../../components/Loader/Loader'
import Search from '../../components/Search/Search'
import { useParams } from 'react-router-dom'

const Pictures = () => {
    const {getPictures, pictures, gallarys, setGetPictures, currentUser} = useInfoContext()
    const path = useParams().id
    const [filtered, setFiltered] = useState(JSON.parse(localStorage.getItem('filter')) || 0) 

    const [fullScreen, setFullScreen] = useState(false);
    const [screenImage, setScreenImage] = useState(null);
    

    const toggleImg = () => setFullScreen(!fullScreen);

    useEffect(()=>{
        if(path){
            gallarys.map(gallary => { 
                if(gallary._id === path){
                    setGetPictures(gallary?.pictures)
                }
            })
        }
    },[gallarys])


  return (
    <div style={{marginTop: '140px'}} className="container">
        <div className="top-pic">
            <h2 style={{textAlign:'center', margin: '30px 0'}}>Pictures</h2>
            <Search/>
            <button>{
            filtered === 0 ? 
            <div onClick={() => {setFiltered(1); localStorage.setItem('filter', JSON.stringify(1))}}>
                <lord-icon
                    src="https://cdn.lordicon.com/uecgmesg.json"
                    trigger="hover"
                    colors="primary:#ffffff,secondary:#f9532d"
                    style={{width:"40px", height:"40px"}}>
                </lord-icon>
            </div> : 
            filtered === 1 ? <div onClick={() => {setFiltered(2); localStorage.setItem('filter', JSON.stringify(2))}}>
                <lord-icon
                    src="https://cdn.lordicon.com/uecgmesg.json"
                    trigger="hover"
                    colors="primary:#ffffff,secondary:#f9532d"
                    style={{width:"40px", height:"40px"}}>
                </lord-icon>
            </div> :
            filtered === 2 ? <div onClick={() => {setFiltered(3); localStorage.setItem('filter', JSON.stringify(3))}}>
                <lord-icon
                    src="https://cdn.lordicon.com/uecgmesg.json"
                    trigger="hover"
                    colors="primary:#ffffff,secondary:#f9532d"
                    style={{width:"40px", height:"40px"}}>
                </lord-icon>
            </div> : 
                <div onClick={() => {setFiltered(0); localStorage.setItem('filter', JSON.stringify(0))}}>
                <lord-icon
                    src="https://cdn.lordicon.com/uecgmesg.json"
                    trigger="hover"
                    colors="primary:#ffffff,secondary:#f9532d"
                    style={{width:"40px", height:"40px"}}>
                </lord-icon>
            </div>                   
            }</button>
        </div>
        <div className='pic-box' style={getPictures.length > 0 || currentUser?.role === 'admin' ? {gap: '220px 30px'} : {gap: '30px'}}>
            {getPictures?.length > 0 ? getPictures.map(result => {
                return (
                    <div className='image' key={result._id}>
                        <img onClick={() => {toggleImg(); setScreenImage(result.picture?.url)}} style={filtered === 2 ? {width: '200px', height: '200px'} : filtered === 3 ? {width: ' 400px', height: '400px'} : filtered === 1 ? {width: '100px', height: '100px'} : filtered === 0 ? {} : {}} src={result.picture?.url} alt="photo" />
                        <b>{result.title}</b>
                        <div className='btn' style={filtered === 1 ? {margin: '0'} : filtered === 3 ? {marginTop: '-200px', marginRight: '-300px'} : {}}><Dropdown result={result} method={'picture'}/></div>
                    </div>
                )
            }) : pictures?.length > 0 ? pictures.map(result => {
                if(!result.private){
                    return (
                        <div className='image' key={result._id}>
                            <img onClick={() => {toggleImg(); setScreenImage(result.picture?.url)}} style={filtered === 2 ? {width: '200px', height: '200px'} : filtered === 3 ? {width: ' 400px', height: '400px'} : filtered === 1 ? {width: '100px', height: '100px'} : filtered === 0 ? {} : {}} src={result.picture?.url} alt="photo" />
                            <b>{result.title}</b>
                            {currentUser?.role === 'admin' && <div className='btn'><Dropdown result={result} method={'picture'}/></div>}
                        </div>
                    )
                }
            }) : <div style={{margin: '0 auto'}}><Loader/></div>}
        </div>
        {fullScreen && <img className="full-screen" src={`${screenImage}`} onClick={toggleImg} alt='image'/>}
    </div>
  )
}

export default Pictures