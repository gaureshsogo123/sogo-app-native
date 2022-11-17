import axios from "axios";
import { SOGO_API } from "@env";

export default axiosInstance = axios.create({
  baseURL: SOGO_API,
});
