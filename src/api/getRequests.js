import axios from "axios"

const serverUrl = process.env.REACT_APP_SERVER_URL;

const API = axios.create({baseURL: serverUrl});

export const getAllProd = ({method}) => API.get(`${method}`); 
export const getOneProd = (id, {method}) => API.get(`${method}/${id}`); 
export const saveProd = (id) => {
    const token = localStorage.getItem("access_token")
    return API.get(`download/${id}`,  {headers: {token}})}