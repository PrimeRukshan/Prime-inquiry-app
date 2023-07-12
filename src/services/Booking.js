import endpoints from "./endpoints";
import axios from "axios";
// import axiosClient from "./api";



export const postBooking = async (token,data) => {


    try {


        let axiosClient = axios.create({
            baseURL: endpoints.baseURL,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + token
            },
            timeout: 5000,
        });

        let response = await axiosClient.post(endpoints.booking,data);
        // console.log('the responds  ---------->', response.data)
        return response;

    } catch (e) {
        throw e;
    }
};