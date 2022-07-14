import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onLikeClick, onDeleteClick }) {
  const currentUser = React.useContext(CurrentUserContext);

  const isLiked = card.likes.some((user) => user === currentUser._id);

  const isOwn = card.owner === currentUser._id;

  function handleClick() {
    onCardClick(card);
  }

  function handleDeleteClick() {
    onDeleteClick(card);
  }

  function handleLikeClick() {
    onLikeClick(card);
  }
  
  return (
    <li className="card">
      <div
        style={{ backgroundImage: `url(${card.link})` }}
        onClick={handleClick}
        className="card__picture"
      />
      <button
        aria-label="delete"
        type="button"
        name="cardDeleteButton"
        className={`card__delete-button ${
          !isOwn && "card__delete-button_hidden"
        }`}
        onClick={handleDeleteClick}
      ></button>

      <div className="card__box">
        <h2 className="card__name">{card.name}</h2>
        <div className="card__like-frame">
          <button
            aria-label="like"
            type="button"
            name="cardLike"
            className={`card__like ${isLiked && "card__like_active"}`}
            onClick={handleLikeClick}
          ></button>
          <span className="card__like-counter">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
