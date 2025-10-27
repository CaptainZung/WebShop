import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost/laravel8/laravel8/public/api", // your backend base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default API