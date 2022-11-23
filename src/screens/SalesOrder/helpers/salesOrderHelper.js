import axiosInstance from "../../../../axiosInstance";

export const fetchProducts = async (
  userId,
  categoryId,
  searchText,
  pageNumber = 1,
  pageSize = 5
) => {
  return axiosInstance
    .post("/product", {
      user_id: userId,
      category_id: categoryId,
      search_text: searchText,
      page_number: pageNumber,
      page_size: pageSize,
    })
    .then((res) => {
      const products = res.data.data;
      return { data: products };
    })
    .catch((err) => {
      return { error: err.message };
    });
};

export const saveOrder = async (
  userId,
  totalItems,
  orderTotal,
  paymentMethod,
  subTotal,
  products,
  discount,
  retailerId
) => {
  return axiosInstance
    .post("/order/saveOrder", {
      userId,
      totalItems,
      orderTotal: orderTotal.toFixed(2),
      paymentMethod,
      discount,
      subTotal: subTotal.toFixed(2),
      retailerId,
      products,
    })
    .then((res) => {
      return { data: res.data.data };
    })
    .catch((err) => {
      return { error: err.message };
    });
};
