import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarPopupRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarPopupRef.current.value,
    });
  }
  return (
    <PopupWithForm
      isOpen={isOpen}
      onSubmit={handleSubmit}
      name="avatar-popup"
      title="Change profile picture"
      onClose={onClose}
      buttonText="Save"
    >
      <input
        id="input_type_avatar"
        type="url"
        placeholder="Image link"
        name="popupInputAvatar"
        required
        className="popup__input popup__input_type_card-link"
        ref={avatarPopupRef}
      />
      <span id="input_type_avatar-error" className="popup__error">
        Please enter a web address.
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
