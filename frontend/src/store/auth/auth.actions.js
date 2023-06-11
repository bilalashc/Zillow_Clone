import { SIGNIN_SUCCESS, SIGNOUT } from "./auth.constants";
import axios from "axios";

import { BASE_URL } from "../../helper/variable";


export const signin = (credential, password) => async (dispatch) => {
  try {
    axios({
      method: "post",
      url: `${BASE_URL}/users/sign_in`,
      data: {
        user: {
          email: credential,
          password: password,
        },
      },
    }).then((response) => {
      localStorage.setItem("authorization", response.headers.authorization);
      localStorage.setItem("current_user", JSON.stringify(response.data.user));
      dispatch({ type: SIGNIN_SUCCESS, payload: response });
      console.log("handleDemoLogin");
      window.location.reload();
    });
  } catch (error) {
    console.log("loginGoogle", error);
  }
};

export const signup = (email, password) => async (dispatch) => {
  try {
    axios({
      method: "post",
      url: `${BASE_URL}/users/`,
      data: {
        user: {
          email: email,
          password: password,
        },
      },
    }).then((response) => {
      localStorage.setItem("authorization", response.headers.authorization);
      localStorage.setItem(
        "current_user",
        JSON.stringify(response.data.status.data)
      );
      dispatch({ type: SIGNIN_SUCCESS, payload: response });
      window.location.reload();
    });
  } catch (error) {
    console.log("Sign Up error", error);
  }
};

export const signout = () => async (dispatch) => {
  try {
    axios({
      method: "delete",
      url: `${BASE_URL}/users/sign_out`,
      headers: {
        Authorization: localStorage.getItem("authorization"),
        "Content-Type": "application/json",
      },
    }).then(() => {
      localStorage.clear();
      // window.location.href = "/";
      dispatch({ type: SIGNOUT });
    });
  } catch (error) {
    console.log("signout Error", error);
  }
};
