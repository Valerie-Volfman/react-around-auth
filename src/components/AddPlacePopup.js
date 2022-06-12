import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onCreateCard }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleName(e) {
    setName(e.target.value);
  }

  function handleLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onCreateCard({
      name,
      link,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="add-card"
      title="New place"
      buttonText="Save"
      onSubmit={handleSubmit}
    >
      <input
        id="input_type_card-title"
        type="text"
        placeholder="Title"
        name="popupInputCardTitle"
        minLength="1"
        maxLength="30"
        required
        className="popup__input popup__input_type_card-title"
        value={name}
        onChange={handleName}
      />
      <span id="input_type_card-title-error" className="popup__error">
        Please fill out this field.
      </span>
      <input
        id="input_type_card-link"
        type="url"
        placeholder="Image link"
        name="popupInputCardLink"
        required
        className="popup__input popup__input_type_card-link"
        value={link}
        onChange={handleLink}
      />
      <span id="input_type_card-link-error" className="popup__error">
        Please enter a web address.
      </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
