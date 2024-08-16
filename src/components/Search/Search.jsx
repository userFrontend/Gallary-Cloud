import React, { useEffect, useState } from 'react'
import './Search.css'
import { useInfoContext } from '../../context/InfoContext'

const Search = () => {
    const {gallarys, resPictures, currentUser, setPictures, setGetPictures, getPictures} = useInfoContext()
    const [dis, setDis] = useState([])

    useEffect(()=>{
        if(getPictures.length > 0){
            setDis(getPictures)
        }
    },[])

    const searchUser = (e) => {
        e.preventDefault()
        const text = e.target.value.toLowerCase()
        if(e.target.value){
            if (getPictures.length > 0) {
                const result = getPictures.filter(({ title }) => {
                    const testString = `${title}`.toLowerCase();
                    let imageName = title.toLowerCase();
                    return testString.includes(text) && imageName.startsWith(text);
                })
                setGetPictures(result)
            } else
            if(resPictures.length > 0 && !getPictures.length > 0){
                const result = resPictures.filter(({ title }) => {
                    const testString = `${title}`.toLowerCase();
                    let imageName = title.toLowerCase();
                    return testString.includes(text) && imageName.startsWith(text);
                })
                setPictures(result)
            }
        }else{
            if(dis.length > 0){
                return setGetPictures(dis)
            }
            setPictures(resPictures)
        }
    }

  return (
    <div className='search-pictures'>
        <div className="search-box">
                <div className="search-input-box">
                    <input onChange={searchUser} type="search" name='name' className="search-input" placeholder='Search'/>
                    <button>
                    <lord-icon
                        src="https://cdn.lordicon.com/unukghxb.json"
                        trigger="hover"
                        colors="primary:#f9532d,secondary:#ffffff"
                        style={{width:"25px", height:"25px"}}>
                    </lord-icon>
                    </button>
                </div>
        </div>
    </div>
  )
}

export default Search