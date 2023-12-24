import axios from "axios";

const API_URL = "";

export const getUserDetails = async (userId:number) => {
  try {
    console.log("userId", userId, API_URL);
    // const {data} = await axios.get(`${API_URL}/breeds/list/all`);
    // return data;
  } catch (error) {
    console.error(error);
  }
};