import axios from "axios"

const serverUrl = process.env.REACT_APP_SERVER_URL;

const API = axios.create({baseURL: serverUrl});

export const delProd = (id, {method}) => {
    const token = localStorage.getItem("access_token");
    return API.delete(`${method}/${id}`, {headers: {token}})}
export const deleteUser = (id, data, {method}) => {
    const token = localStorage.getItem("access_token");
    return API.post(`${method}/${id}`, data, {headers: {token}})}