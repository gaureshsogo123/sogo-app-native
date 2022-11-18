import axiosInstance from "../../../../axiosInstance.js";

export const getRetailers = async () => {
  try {
    const { data } = await axiosInstance.get("/retailer");
    return data.data;
  } catch (error) {
    console.log(error.message);
  }
};
