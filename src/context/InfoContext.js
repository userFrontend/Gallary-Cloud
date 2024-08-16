import { getAllProd } from "../api/getRequests";

const { createContext, useContext, useState, useEffect } = require("react");


const InfoContext = createContext()

export const useInfoContext = () => useContext(InfoContext)

export const InfoProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("profile")) || null)
    const [gallarys, setGallarys] = useState([])
    const [getPictures, setGetPictures] = useState([])
    const [loading, setLoading] = useState(false)
    const [resPictures, setResPictures] = useState([])
    const [pictures, setPictures] = useState([])
    const [id, setId] = useState(null)

    const toggleReset = () => setLoading(!loading)
     
    useEffect(()=>{
        const getGallary = async () => {
            try {
                const res = await getAllProd({method: 'gallary'})
                setGallarys(res.data.gallarys)
            } catch (error) {
                
            }
        }
        getGallary()
        const getPicture = async () =>{
            try {
                const res = await getAllProd({method: 'picture'})
                setResPictures(res.data.pictures)
                setPictures(res.data.pictures)
            } catch (error) {
                console.log(error);
            }
        }
        getPicture()
    },[loading])
    
    const exit = () => {
        localStorage.clear()
        setCurrentUser(null)
        window.location.replace('/')
    }

     const value = {
        currentUser, setCurrentUser,
        exit, gallarys, setGallarys,
        toggleReset, getPictures, setGetPictures,
        pictures, setPictures, id, setId,
        resPictures
    }
 
    return (
        <InfoContext.Provider value={value}>
            {children}
        </InfoContext.Provider>
    )
}