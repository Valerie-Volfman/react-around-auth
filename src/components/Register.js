import React from "react";
import logo from "../images/Logo.svg";
import * as auth from "../utils/auth";
import { Link, useHistory } from 'react-router-dom';

function Register(props) {

    const [inputEmail, setInputEmail] = React.useState('')
    const [inputPassword, setPassword] = React.useState('')
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault();
        auth.register(inputEmail, inputPassword).then((res) => {
            if(res) {
   console.log(res);
                history.push('/signin');
            }
        })
        .catch((err) => console.log(err))
    }

    return (
        <div className="welcome-page">
            <header className="header">
                <img className="logo" alt="Around the US logo" src={logo} />
                <div className="menu">
                <Link to="/signin" className="menu__button-white">Log in</Link>
                </div>
            </header>
            <div className="welcome-page__content">
                <h2 className="welcome-page__title">Sign up</h2>
                <form onSubmit={handleSubmit} className="welcome-page__form">
                    <input type="text" name="email" placeholder="Email" className="welcome-page__input welcome-page__input_type_email" value={inputEmail.value} onChange={(e) => setInputEmail(e.target.value)} />
                    <input type="password" name="password" placeholder="Password" className="welcome-page__input welcome-page__input_type_password" value={inputPassword.value} onChange={(e) => setPassword(e.target.value)} />
                    <button className="welcome-page__button">Sign up</button>
                </form>
                <p>Already a member? <Link to="/signin" className="welcome-page__link">Log in here!</Link></p>
            </div>
        </div>
    )
}

export default Register;