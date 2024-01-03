import React, { useContext } from "react";
import MagazineList from "./MagazineList";
import { LoginForm } from "./LoginForm";
import { MagazineContext } from "../contexts/MagazineContext";

export const AppContainer = () => {
  // @ts-ignore
  const { state } = useContext(MagazineContext);
  return <div>{state.showLogIn ? <LoginForm /> : <MagazineList />}</div>;
};
