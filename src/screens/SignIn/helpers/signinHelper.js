import axiosInstance from "../../../../axiosInstance.js";

export const signIn = async ({ mobile_no }) => {
  return axiosInstance
    .post("/user/signIn", { mobile_no })
    .then((res) => {
      console.log(res.data.data);
      return { message: res.data.message, data: res.data.data };
    })
    .catch((err) => {
      return { error: err.message, data: {} };
    });
};

export const signUp = async ({ mobile_no }) => {
  return axiosInstance
    .post("/user/signUp", { mobile_no })
    .then((res) => {
      return { data: res.data.message };
    })
    .catch((err) => {
      if (err.response?.status !== 400) {
        return { error: err.response?.data?.message, data: {} };
      } else {
        return { error: "", data: {} };
      }
    });
};
