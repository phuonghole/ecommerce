import { createContext, useState, useEffect } from "react";
import ProductsApi from "./api/ProductsApi";
import UserApi from "./api/UserApi";
import CategoryApi from "./api/CategoryApi";
import axios from "axios";
export const GobalState = createContext();
export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);
  const refreshToken = async () => {
    const res = await axios.get("/user/refresh_token");
    setToken(res.data.accesstoken);
  };
  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      refreshToken();
    }
  }, []);
  const state = {
    token: [token, setToken],
    ProductsApi: ProductsApi(),
    UserApi: UserApi(token),
    CategoryApi: CategoryApi(),
  };
  return <GobalState.Provider value={state}>{children}</GobalState.Provider>;
};
