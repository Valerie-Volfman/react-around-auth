import React from "react";
import PopupWithForm from "./PopupWithForm";

function InfoTooltip({isOpen, onClose, success}) {



    return (
        <PopupWithForm
        isOpen={isOpen}
        onClose={onClose}>
            <h2></h2>
        </PopupWithForm>
    )
}

export default InfoTooltip;