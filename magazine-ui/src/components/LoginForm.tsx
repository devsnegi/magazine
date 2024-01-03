import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
// @ts-ignore
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";

import { MagazineContext } from "../contexts/MagazineContext";
import {
  BASE_API_URL,
  UPDATE_USER_NAME,
  SHOW_LOGIN_POPUP,
} from "../constant/appConstant";

export const LoginForm = () => {
  // @ts-ignore
  const { dispatch } = useContext(MagazineContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // @ts-ignore
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("test");
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      };
      // let userId = 0;
      fetch(`${BASE_API_URL}auth/login`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log("data:-", data);
          if (data.error) {
            toast.error(data.message);
          } else {
            const token = data.token;
            Cookies.set("token", token, { expires: 7, secure: true });
            dispatch({
              type: UPDATE_USER_NAME,
              payload: { username: username, userId: data.userId },
            });
            dispatch({
              type: SHOW_LOGIN_POPUP,
              payload: { showLogIn: false },
            });
          }
        })
        .catch((err) => {
          toast.error("Login Failed due to : " + err.message);
        });
    }
  };

  const validate = () => {
    let result = true;
    if (username === "" || username === null) {
      result = false;
      toast.warning("Please Enter Username", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }

    if (password === "" || password === null) {
      result = false;
      toast.warning("Please Enter Password", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }

    return result;
  };

  return (
    <div className="box">
      <h2>Login</h2>
      <form>
        <input
          className="inputbox"
          type="text"
          placeholder="User Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="inputbox"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input type="submit" value="Login" onClick={handleSubmit} />
      </form>
    </div>
  );
};
