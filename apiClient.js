import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://your-api-url.com/api",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("mySecret")}`,
  },
});

export default apiClient;
