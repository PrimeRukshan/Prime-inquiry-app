import endpoints from "./endpoints";
import axios from "axios";
// import axiosClient from "./api";



export const getCountry = async payload => {


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

        let response = await axiosClient.get(endpoints.country);
        // console.log('the country response api -------------->', response)
        return response;

    } catch (e) {
        throw e;
    }
};