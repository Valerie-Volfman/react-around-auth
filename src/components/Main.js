import React from "react";
import editAvatarIcon from "../images/Avatar.svg";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({
  onEditAvatarClick,
  onEditProfileClick,
  onAddPlaceClick,
  onCardClick,
  cards,
  onLikeClick,
  onDeleteClick,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__pic-wrapper">
          <img
            className="profile__pic-icon"
            aria-label="edit"
            type="submit"
            name="avatarButton"
            src={editAvatarIcon}
            alt="icon"
          />
          <div
            onClick={onEditAvatarClick}
            className="profile__pic"
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
          ></div>
        </div>
        <div className="profile__container">
          <div className="profile__info">
            <div className="profile__name">
              <h1 className="profile__value profile__value_type_name">
                {currentUser.name}
              </h1>
              <button
                onClick={onEditProfileClick}
                aria-label="edit"
                type="submit"
                name="editButton"
                className="profile__edit-button"
              ></button>
            </div>
            <p className="profile__value profile__value_type_profession">
              {currentUser.about}
            </p>
          </div>
        </div>
        <button
          onClick={onAddPlaceClick}
          aria-label="add"
          type="submit"
          name="profileAddButton"
          className="profile__add-button"
        ></button>
      </section>
      <section className="places">
        <ul className="places__cards">
          {cards.map((item) => (
            <Card
              onDeleteClick={onDeleteClick}
              onLikeClick={onLikeClick}
              key={item._id}
              card={item}
              onCardClick={onCardClick}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
