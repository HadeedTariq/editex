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

const itemApi = axios.create({
  baseURL: `${url}/folder`,
  withCredentials: true,
});

const shareCodeApi = axios.create({
  baseURL: `${url}/share-code`,
  withCredentials: true,
});
const blogApi = axios.create({
  baseURL: `${url}/blog`,
  withCredentials: true,
});

export { authApi, projectApi, itemApi, shareCodeApi, blogApi };
