import React from "react";
import logo from "../images/Logo.svg";

function Header() {
  return (
    <header className="header">
      <img className="logo" alt="Around the US logo" src={logo} />
      <div className="menu">
      <p className="menu__mail">email@mail.com</p>
      <a className="menu__button">Log out</a>
      </div>
    </header>
  );
}

export default Header;
