import endpoints from "./endpoints";
import axios from "axios";
// import axiosClient from "./api";



export const getServices = async payload => {


    try {


        let axiosClient = axios.create({
            baseURL: endpoints.baseURL,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + payload
            },
            timeout: 5000,
        });

        let response = await axiosClient.get(endpoints.services);
        return response;

    } catch (e) {
        throw e;
    }
};