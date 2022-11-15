export const signIn = (data) => {
  return Promise.resolve({
    data: {
      userId: 1,
      address: "Kolkata",
      role: "retailer",
    },
  });
};

export const signUp = (data) => {
  return Promise.resolve(true);
};
