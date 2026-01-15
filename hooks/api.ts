import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

if (process.env.NODE_ENV === "development") {
  setInterval(() => {
    api
      .get("/role/count")
      .then(() => {
        console.log("[API] alive");
      })
      .catch(() => {
        console.error("[API] unreachable");
      });
  }, 30000); // 10s ping 1 lần
}

export default api;
