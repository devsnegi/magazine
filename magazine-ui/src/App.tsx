import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import MagazineContextProvider from "./contexts/MagazineContext";
import { Header } from "./components/Header";
import MagazineList from "./components/MagazineList";

const App = () => {
  return (
    <div className="App">
      <MagazineContextProvider>
        <Header />
        <MagazineList />
      </MagazineContextProvider>
    </div>
  );
};

export default App;
