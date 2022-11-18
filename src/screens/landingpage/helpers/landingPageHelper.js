import axiosInstance from "../../../../axiosInstance.js";

export const getRetailers = async (distributorId) => {
  try {
    const { data } = await axiosInstance.get(`/retailer/${distributorId}`);
    return data.data;
  } catch (error) {
    console.log(error.message);
  }
};
