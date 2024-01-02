import React, { createContext, useReducer, useEffect } from "react";
import { magazineReducer } from "../reducers/magazineReducer";
// @ts-expect-error
export const MagazineContext = createContext();

// @ts-expect-error
const MagazineContextProvider = (props) => {
  const [magazines, dispatch] = useReducer(magazineReducer, []);

  // useEffect(() => {
  //   localStorage.setItem("books", JSON.stringify(magazines));
  // }, [magazines]);
  return (
    <MagazineContext.Provider value={{ magazines, dispatch }}>
      {props.children}
    </MagazineContext.Provider>
  );
};

export default MagazineContextProvider;
