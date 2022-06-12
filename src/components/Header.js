import React from "react";
import logo from "../images/Logo.svg";

function Header() {
  return (
    <header className="header">
      <img className="logo" alt="Around the US logo" src={logo} />
    </header>
  );
}

export default Header;
