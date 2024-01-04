import React, { useContext } from "react";
// import MagazineList from "./MagazineList";
import { List } from "./List";
import { LoginForm } from "./LoginForm";
import { MagazineContext } from "../contexts/MagazineContext";

export const AppContainer = () => {
  // @ts-ignore
  const { state } = useContext(MagazineContext);
  // @ts-ignore
  return <div>{state.showLogIn ? <LoginForm /> : <List />}</div>;
};
