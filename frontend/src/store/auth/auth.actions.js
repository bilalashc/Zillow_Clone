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
      debugger
      localStorage.setItem("authorization", response.headers.authorization);
      localStorage.setItem("current_user", JSON.stringify(response.data.user));
      dispatch({ type: SIGNIN_SUCCESS, payload: response });
      console.log("handleDemoLogin");
      window.location.href = "/";

    })
    .catch ((error) =>{
      alert("Wrong username or Password: Please enter the correct credentials")
    })
  } catch (error) {
    alert(error.message)
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
      window.location.href = "/";
    })
    .catch ((error) =>{
      alert(error.message)
    })
  } catch (error) {
    alert(error.message)
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
      window.location.href = "/";
      dispatch({ type: SIGNOUT });
    })
    .catch ((error) =>{
      alert(error.message)
    })
  } catch (error) {
    alert(error.message)
    console.log("signout Error", error);
  }
};