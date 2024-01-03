import React, { createContext, useReducer, useEffect } from "react";
import { magazineReducer, initialState } from "../reducers/magazineReducer";
// @ts-expect-error
export const MagazineContext = createContext();

// @ts-expect-error
const MagazineContextProvider = (props) => {
  const [state, dispatch] = useReducer(magazineReducer, initialState);
  return (
    <MagazineContext.Provider value={{ state, dispatch }}>
      {props.children}
    </MagazineContext.Provider>
  );
};

export default MagazineContextProvider;
