import endpoints from "./endpoints";
import axios from "axios";
// import axiosClient from "./api";



export const getPackages = async payload => {


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

        let response = await axiosClient.get(endpoints.packages);
        // console.log('the responds  ---------->', response.data)
        return response;

    } catch (e) {
        throw e;
    }
};