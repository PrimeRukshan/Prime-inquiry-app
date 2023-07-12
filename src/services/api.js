import axios from "axios";
import endpoints from "./endpoints";


const axiosClient = axios.create({
    baseURL: endpoints.baseURL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    timeout:5000,
  });

  export default axiosClient;