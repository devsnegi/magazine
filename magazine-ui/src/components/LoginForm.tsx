import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { MagazineContext } from "../contexts/MagazineContext";
import { BASE_API_URL } from "../constant/appConstant";

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
    }
    // let userId = 0;
    // fetch(`${BASE_API_URL}user`, requestOptions)
    //   .then((response) => response.json())
    //   .then((data) => setSubscriptionList(data));

    // dispatch({ type: "UPDATE_USER_NAME", payload: { username, userId } });
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

    return false;
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
