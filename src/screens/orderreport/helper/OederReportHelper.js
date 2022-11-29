import { format } from "date-fns";
import axiosInstance from "../../../../axiosInstance"


export const getOrderReport = (userId,date)=>{
    const formatDate = format(date, "yyyy-MM-dd");
    return axiosInstance
    .post(`/order/summary`, { userId,date:formatDate})
    .then((res) => {
      console.log("ordersummery",res.data.data);
      return { data: res.data.data };
    })
    .catch((err) => {
      return { message: err.message };
    });
}