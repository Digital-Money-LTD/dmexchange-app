import ApiManager from "./ApiManager";

export const user_login = async data => {
    try {
      const result = await ApiManager("/login", {
          method:"POST",
          headers:{
             'Content-Type':"application/json"

          },
          data:data,
      });
      return result;
  } catch (error) {
    return error.response.data 
  }

};