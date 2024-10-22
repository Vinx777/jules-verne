import axios, { AxiosError } from "axios";
import history from "../history";

import { userSlice } from "@/redux/user/slice";
import { message } from "antd";

const baseURL = "http://123.56.149.216:8080";
const instance = axios.create({
  baseURL,
  headers: {
    "x-icode": "F6721B01219A0E86",
  },
});

let store;

export const injectStore = (_store) => {
  store = _store;
};

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (!error.response) {
      message.error("network anomaly", 3);
    } else if (error.response.status === 401) {
      message.error("The user is not logged in or the identity has expired, please log in again", 3);
      store.dispatch(userSlice.actions.logOut());
      history.push('/signIn')
    }
    return Promise.reject(error)
  }
);

export default instance;
