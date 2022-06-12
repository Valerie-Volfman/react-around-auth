import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState("");
  const [profession, setProfession] = React.useState("");

  function handleName(e) {
    setName(e.target.value);
  }

  function handleProfession(e) {
    setProfession(e.target.value);
  }

  const currentUser = React.useContext(CurrentUserContext);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: profession,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setProfession(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={isOpen}
      name="edit-profile"
      title="Edit Profile"
      onClose={onClose}
      buttonText="Save"
    >
      <input
        value={name || ""}
        onChange={handleName}
        id="input_type_name"
        type="text"
        placeholder="Enter your first name"
        name="popupInputName"
        minLength="2"
        maxLength="40"
        required
        className="popup__input popup__input_type_name"
      />
      <span id="input_type_name-error" className="popup__error">
        Please fill out this field.
      </span>
      <input
        value={profession || ""}
        onChange={handleProfession}
        id="input_type_profession"
        type="text"
        placeholder="Your profession"
        name="popupInputProfession"
        minLength="2"
        maxLength="200"
        required
        className="popup__input popup__input_type_profession"
      />
      <span id="input_type_profession-error" className="popup__error">
        Please fill out this field.
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
