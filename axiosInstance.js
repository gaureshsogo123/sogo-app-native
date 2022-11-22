import axios from "axios";
import { SOGO_API } from "@env";

export default axiosInstance = axios.create({
  baseURL: SOGO_API, //"http://138.68.122.230:8001/api",
});
