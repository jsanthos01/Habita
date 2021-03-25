import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });
API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
});

export const register = (formData) => API.post("/api/auth/register", formData);
export const login = (formData) => API.get("/api/auth/login", formData);
export const user = () => API.get("/api/private/user");