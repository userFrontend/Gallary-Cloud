import axios from "axios"

const serverUrl = process.env.REACT_APP_SERVER_URL;

const API = axios.create({baseURL: serverUrl});

export const updateProd = (id, data, {method}) => {
    console.log(method);
    const token = localStorage.getItem("access_token")
    return API.put(`${method}/${id}`, data, {headers: {token}})}; 