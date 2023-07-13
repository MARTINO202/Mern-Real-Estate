import axios from "axios";

const instance = axios.create({
    baseURL: "https://mern-realestate-l38p.onrender.com",
});

export default instance;
