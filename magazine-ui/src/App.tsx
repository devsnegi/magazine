import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./styles.css";
import MagazineContextProvider, {
  MagazineContext,
} from "./contexts/MagazineContext";
import { Header } from "./components/Header";
import { AppContainer } from "./components/AppContainer";
// import MagazineList from "./components/MagazineList";
// import { LoginForm } from "./components/LoginForm";

const App = () => {
  // @ts-ignore
  // const { state } = useContext(MagazineContext);
  return (
    <div className="App">
      <MagazineContextProvider>
        <Header />
        {/* {state.showLogIn ? <LoginForm /> : <MagazineList />} */}
        <AppContainer />
        <ToastContainer />
      </MagazineContextProvider>
    </div>
  );
};

export default App;
