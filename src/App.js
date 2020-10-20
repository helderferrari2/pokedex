import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Routes from "./router/routes";
import "./sass/main.scss";
import "nes.css/css/nes.min.css";

function App() {
  return (
    <div className="App">
      <div className="main">
        <div className="main__header">
          <Header />
        </div>
        <div className="main__body">
          <div className="main__body__content">
            <Routes />
          </div>
        </div>
        <div className="main__footer">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
