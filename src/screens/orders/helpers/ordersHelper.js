import axiosInstance from "../../../../axiosInstance";
import { Alert } from "react-native";

export const getOrders = async (user_id) => {
  return axiosInstance
    .post("/order", {
      user_id: user_id,
    })
    .then((res) => {
      return { data: res.data.data };
    })
    .catch((err) => {
      return { message: err.message };
    });
};

export const getOrderStatus = async () => {
  return axiosInstance
    .get("/order/orderStatus")
    .then((res) => {
      return { data: res.data.data };
    })
    .catch((err) => {
      Alert.alert("", "There was an error");
      return { message: err.message };
    });
};

export const editOrderStatus = async (orderId, orderStatusId, orderStatus) => {
  return axiosInstance
    .put("/order/editOrderStatus", { orderId, orderStatusId, orderStatus })
    .then((res) => {
      return { data: res.data.data };
    })
    .catch((err) => {
      Alert.alert("", "There was an error");
      return { message: err.message };
    });
};

export const addRetailer = async (mobile, name, address) => {
  return axiosInstance
    .post("/retailer/addRetailer", { mobile, name, address })
    .then((res) => {
      if (
        res.data.data &&
        res.data.data.length &&
        res.data.data[0].messages === "Duplicate Mobile Numeber, Please Verify"
      ) {
        console.log("add retailer error msg", res.data.data);
        return {
          success: false,
          message: "Duplicate Mobile Number, Please Verify",
        };
      } else {
        console.log("add retailer", res.data.data);
        return { success: true, data: res.data.data };
      }
    })
    .catch((err) => {
      console.log("add retailer error", err);
      return { success: false, message: err.message };
    });
};

export const getOrderSummary = async (userId, date) => {
  const formatDate = format(date, "yyyy-MM-dd");
  return axiosInstance
    .post(`/order/summary`, { userId, date: formatDate })
    .then((res) => {
      console.log("get order summary", res.data.data);
      return { data: res.data.data };
    })
    .catch((err) => {
      return { message: err.message };
    });
};

export const downloadOrderSummary = async (userId, date) => {
  const formatDate = format(date, "yyyy-MM-dd");
  return axiosInstance
    .post(
      `/order/download/summary`,
      { userId, date: formatDate },
      { responseType: "blob" }
    )
    .then((res) => {
      console.log("download order summary", res.data.data);
      return {
        data: res.data,
      };
    })
    .catch((err) => {
      return { message: err.message };
    });
};
