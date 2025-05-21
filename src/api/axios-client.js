import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API;

console.log('BASE_URL', BASE_URL);


const axiosClient = axios.create({
  baseURL: `${BASE_URL}`,
  timeout: 120000,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    Accept: "application/json",
  },
});

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    return Promise.reject(error || "An unknown error occurred");
  }
);

export default axiosClient;
