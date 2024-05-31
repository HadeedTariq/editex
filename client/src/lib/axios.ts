import axios from "axios";

const url = import.meta.env.VITE_BACKEND_URL;

const authApi = axios.create({
  baseURL: `${url}/auth`,
  withCredentials: true,
});

const projectApi = axios.create({
  baseURL: `${url}/project`,
  withCredentials: true,
});

export { authApi, projectApi };
