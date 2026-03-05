import axios from "axios";
import { SERVER_URL } from "./serverUrl";

const api = axios.create({
  baseURL: SERVER_URL,
});

export default api;
