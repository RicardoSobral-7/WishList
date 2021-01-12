import axios from "axios";

const api = axios.create({
    baseURL:"http://localhost:5550"
});

export default api;