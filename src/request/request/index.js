import axios from "axios";

export const api = axios.create({
    baseURL: "https://139.196.20.137:5001/api",
    withCredentials: true,
    timeout: 7000,
    responseType: "json"
})