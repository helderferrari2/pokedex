import React from "react";
import Logo from "../assets/images/logo.png";

function Header() {
  return (
    <header className="header">
      <a href="/" className="logo">
        <img src={Logo} alt="logo"></img>
      </a>
    </header>
  );
}

export default Header;
