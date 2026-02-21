import axios from "axios";


const API = axios.create({
  baseURL: "https://json-server-3nmx.onrender.com"
});

export default API;