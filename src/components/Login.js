import React from "react";
import logo from "../images/Logo.svg";

function Login() {

    const [inputEmail, setInputEmail] = React.useState('')
    const [inputPassword, setPassword] = React.useState('')

    return (
        <div className="welcome-page">
            <header className="header">
                <img className="logo" alt="Around the US logo" src={logo} />
                <div className="menu">
                <a className="menu__button-white">Sign up</a>
                </div>
            </header>
            <div className="welcome-page__content">
                <h2 className="welcome-page__title">Log In</h2>
                <form className="welcome-page__form">
                    <input type="text" name="email" placeholder="Email" className="welcome-page__input welcome-page__input_type_email" value={inputEmail.value} />
                    <input type="password" name="password" placeholder="Password" className="welcome-page__input welcome-page__input_type_password" value={inputPassword.value} />
                </form>
                <button className="welcome-page__button">Sign up</button>
                <a className="welcome-page__link">Not a member yet? Sign up here!</a>
            </div>
        </div>
    )
}

export default Login;