import { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const getUser = async () => {
      let user = {};
      user.userId = await AsyncStorage.getItem("userId");
      user.name = await AsyncStorage.getItem("userName");
      user.role = await AsyncStorage.getItem("role");
      setUser(user);
    };
    getUser();
  }, []);

  const isLoggedIn = () => {
    return user.userId ? true : false;
  };

  const loginUser = (data) => {
    setUser({
      userId: data.userid,
      role: data.rolename,
      userName: data.name,
    });
    AsyncStorage.setItem("userId", data.userid);
    AsyncStorage.setItem("role", data.rolename);
    AsyncStorage.setItem("userName", data.name);
    return true;
  };

  const logoutUser = () => {
    setUser();
    AsyncStorage.multiRemove(["userId", "role", "userName"])
      .then(() => true)
      .catch(() => false);
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
export const useAuthContext = () => useContext(AuthContext);
