import axios from "axios";

const db = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Jika sudah jwt gunakan ini
// db.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

db.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Api error: ", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default db;
