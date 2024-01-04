import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./styles.css";
import MagazineContextProvider from "./contexts/MagazineContext";
import { Header } from "./components/Header";
import { AppContainer } from "./components/AppContainer";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="App">
      <MagazineContextProvider>
        <Header />
        <AppContainer />
        <ToastContainer />
      </MagazineContextProvider>
    </div>
  );
};

export default App;
