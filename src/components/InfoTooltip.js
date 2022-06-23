import React from "react";
import succeed from "../images/Succeed.svg";
import unsucceed from "../images/Unsucceed.svg";

function InfoTooltip({ isOpen, onClose, isSucceed }) {
    return (
        <section
            className={`popup ${isOpen && "popup__is-opened"}`}
        >
            <div className="popup__content">
                <img className="popup__info-image" src={isSucceed ? succeed : unsucceed} alt={isSucceed ? 'sucess!' : 'something wrong'} />
                <button
                    onClick={onClose}
                    aria-label="close"
                    type="button"
                    name="popupEditProfileCloseButton"
                    className="popup__close-button"
                ></button>
                <h2 className="popup__title">{isSucceed ? 'Good' : 'NotGood'}</h2>
            </div>
        </section>
    )
}

export default InfoTooltip;