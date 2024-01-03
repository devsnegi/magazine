import React, { useContext } from "react";
import { MagazineContext } from "../contexts/MagazineContext";
export const Header = () => {
  // @ts-ignore
  const { state, dispatch } = useContext(MagazineContext);
  //@ts-ignore
  const showMySubscription = (e) => {
    e.preventDefault();
    dispatch({ type: "SHOW_MY_SUBSCRIPTION" });
  };
  // @ts-ignore
  const showMagazineList = (e) => {
    e.preventDefault();
    dispatch({ type: "SHOW_MAGAZINE_LIST" });
  };
  const handleLogin = () => {
    dispatch({ type: "SHOW_LOGIN_POPUP", payload: { showLogIn: true } });
  };
  return (
    <div className="navbar">
      <h1 className="app-title" onClick={showMagazineList}>
        Magazine App
      </h1>
      {state.username ? (
        <div className="my-subscription" onClick={showMySubscription}>
          My Subscription
        </div>
      ) : (
        <div>
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
};
