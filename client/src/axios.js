import axios from "axios";

const instance = axios.create({
    baseURL: "https://real-estatee.onrender.com",
});

export default instance;
