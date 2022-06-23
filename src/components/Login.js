import React from "react";
import { authorize } from "../utils/auth";
import { Link } from "react-router-dom";

function Login(props) {

    const [inputEmail, setInputEmail] = React.useState('');
    const [inputPassword, setInputPassword] = React.useState('');

    const resetForm = () => {
        setInputEmail('');
        setInputPassword('');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        authorize({ email: inputEmail, password: inputPassword })
            .then((data) => {
                props.handleLogin(inputEmail);
                localStorage.setItem('jwt', data.token);
                resetForm();
            })
            .catch((err) => console.log(err));
    }

    return (
        <div className="welcome-page">
            <div className="welcome-page__content">
                <h2 className="welcome-page__title">Log In</h2>
                <form onSubmit={handleSubmit} className="welcome-page__form">
                    <input type="text" name="email" placeholder="Email" className="welcome-page__input welcome-page__input_type_email" value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} />
                    <input type="password" name="password" placeholder="Password" className="welcome-page__input welcome-page__input_type_password" value={inputPassword} onChange={(e) => setInputPassword(e.target.value)} />
                    <button type="submit" className="welcome-page__button">Log in</button>
                </form>
                <p>Not a member yet? <Link to="/signup" className="welcome-page__link">Sign up here!</Link></p>
            </div>
        </div>
    )
}

export default Login;