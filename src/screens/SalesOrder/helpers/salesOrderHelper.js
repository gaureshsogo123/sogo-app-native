import axiosInstance from "../../../../axiosInstance";

export const fetchProducts = (
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
      //console.log("get products", res.data.data);
      const products = res.data.data.map((product) => ({
        ...product,
        units: 0,
      }));
      return { data: products };
    })
    .catch((err) => {
      console.log(err);
      return { error: err.message };
    });
};
