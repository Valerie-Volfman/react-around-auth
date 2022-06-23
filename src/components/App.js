import React from "react";
import { Route, Switch } from 'react-router-dom';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from "./ProtectedRoute";
import { useHistory } from "react-router-dom";
import { checkToken, register } from "../utils/auth";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = React.useState(false);
  const [isSucceed, setIsSucceed] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false)
  const [currentUserEmail, setCurrentUserEmail] = React.useState('');

  const history = useHistory();
  React.useEffect(() => {
    const token = localStorage.getItem('jwt');
    token &&
      checkToken(token)
        .then(res => {
          setLoggedIn(true);
          setCurrentUserEmail(res.data.email);
          history.push('/');
        })
        .catch(err => console.log(err));
  }, [history]);
  React.useEffect(() => {
    api
      .getUserData()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleUserUpdate(data) {
    api
      .editUserData(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(data) {
    api
      .editProfilePic(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((user) => user._id === currentUser._id);

    api
      .changeLikeCardStatus(card, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .removeCard(card)
      .then((res) => {
        setCards((state) => state.filter((items) => items._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleAppPlaceSubmit(data) {
    api
      .addCard(data)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(data) {
    setSelectedCard(data);
  }

  React.useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    };

    document.addEventListener("keydown", closeByEscape);

    return () => document.removeEventListener("keydown", closeByEscape);
  }, []);

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsInfoPopupOpen(false);
  }

  function handleLogin(data) {
    setLoggedIn(true);
    setCurrentUserEmail(data);
    history.push('/')
  }
  function handleLogOut() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    setCurrentUserEmail('');
  }
  function handleRegister(inputEmail, inputPassword) {
    register(inputEmail, inputPassword).then((res) => {
      if (res.status === 201) {
        setIsSucceed(true);
      } else {
        setIsSucceed(false);
      }
    })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsInfoPopupOpen(true);
      })
  }
  return (
    <div className="page__wrapper">
      <CurrentUserContext.Provider value={currentUser}>
        <Header currentUserEmail={currentUserEmail} handleLogOut={handleLogOut} loggedIn={loggedIn} />
        <Switch>
          <ProtectedRoute exact path={"/"} loggedIn={loggedIn}>
            <Main
              onEditProfileClick={handleEditProfileClick}
              onAddPlaceClick={handleAddPlaceClick}
              onEditAvatarClick={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onLikeClick={handleCardLike}
              onDeleteClick={handleCardDelete}
              cards={cards}
            />
          </ProtectedRoute>
          <Route path="/signup">
            <Register handleRegister={handleRegister} />
          </Route>
          <Route path="/signin">
            <Login handleLogin={handleLogin} />
          </Route>
        </Switch>
        <Footer />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip isOpen={isInfoPopupOpen} onClose={closeAllPopups} isSucceed={isSucceed} />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUserUpdate}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onCreateCard={handleAppPlaceSubmit}
        />
        <section className="popup popup_type_remove-popup">
          <div className="popup__content">
            <button
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
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
