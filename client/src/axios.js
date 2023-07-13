import axios from "axios";

const instance = axios.create({
    baseURL: "https://real-estateoo.onrender.com",
});

export default instance;
