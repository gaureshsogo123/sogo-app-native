export const calculateTotal = (products) => {
  let total = 0;
  let discount = 0;
  let finalPrice = 0;
  products.forEach((product) => {
    finalPrice += (product.price - product.discount) * (product.quantity || 0);
    discount += product.discount * (product.quantity || 0);
    total += product.price * (product.quantity || 0);
  });
  return { total, discount, finalPrice };
};
