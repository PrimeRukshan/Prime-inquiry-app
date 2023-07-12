import endpoints from "./endpoints";
import axiosClient from "./api";



export const userSignin = async () => {
    let payload = {
        "email": "import5@primelogistics.ae",
        "password" : "123456"
    }
    try {
      let response = await axiosClient.post(endpoints.login, payload);
      // console.log('the responds ---------->',response.data)
      return response;
    
    } catch (e) {
      throw e;
    }
  };