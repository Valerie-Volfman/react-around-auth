import React from "react";
import logo from "../images/Logo.svg";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";

function Header({ loggedIn, currentUser, handleLogOut }) {
  const history = useHistory();
  const location = useLocation();
  return (
    <header className="header">
      <img className="logo" alt="Around the US logo" src={logo} />
      <div className="menu">
        <p className="menu__mail">{currentUser}</p>
        {loggedIn && <button onClick={handleLogOut} className="menu__button">Log out</button>}
        {location.pathname === '/signin' && <button onClick={() => history.push('/signup')} className="menu__button">Sign up</button>}
        {location.pathname === '/signup' && <button onClick={() => history.push('/signin')} className="menu__button">Sign in</button>}
      </div>
    </header>
  );
}

export default Header;
