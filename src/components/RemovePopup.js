import React from "react";

function RemovePopup({isOpen, onClose}) {

    return (
        <section className={`popup popup_type_remove-popup ${isOpen && "popup__is-opened"}`}>
            <div className="popup__content">
                <button
                    onClick={onClose}
                    aria-label="close"
                    type="button"
                    name="popupAddCardCloseButton"
                    className="popup__close-button"
                ></button>
                <h2 className="popup__title">Are you sure?</h2>
                <form id="delete-popup" name="removePopup" className="popup__form">
                    <button
                        form="delete-popup"
                        aria-label="save"
                        type="submit"
                        name="popupSaveButton"
                        className="popup__save-button"
                    >
                        Yes
                    </button>
                </form>
            </div>
        </section>
    );
}

export default RemovePopup;