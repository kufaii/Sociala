import axios from "axios";

const instance = axios.create({
  baseURL: "https://b1f6-182-253-50-49.ngrok-free.app",
});

export default instance;
