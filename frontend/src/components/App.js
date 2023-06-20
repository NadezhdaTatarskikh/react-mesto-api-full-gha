import React, { useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { Route, Routes, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.js";
import api from "../utils/Api.js";
import * as auth from "../utils/auth.js";
import Header from "./Header.js";
import Main from "./Main.js";
import ImagePopup from "./ImagePopup.js";
import Footer from "./Footer.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import PopupWithDeleteCard from "./PopupWithDeleteCard.js";
import Register from "./Register.js";
import Login from "./Login.js";
import InfoTooltip from "./InfoTooltip .js";

function App() {
  /**переменные состояния попапов */
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isCardPopupOpen, setIsCardPopupOpen] = useState(false);
  const [isDeleteCardPopapOpen, setIsDeleteCardPopupOpen] = useState(false);

  const [isRenderLoading, setIsRenderLoading] = useState(false);

  /**Переменные состояния для попапа открытия карточки*/
  const [selectedCard, setSelectedCard] = useState(null);

  /**переменные состояния пользователя*/
  const [currentUser, setCurrentUser] = useState({});

  //**переменную состояния карточки*/
  const [cards, setCards] = useState([]);

  /**Переменные состояния зарегистрированного пользователя*/
  const [loggedIn, setLoggedIn] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  /**Переменная состояния для попапа страницы регистрации*/
  const [infoSuccessOpen, setInfoSuccessOpen] = useState(false);
  // переменные хедера
  const [headerEmail, setHeaderEmail] = useState("");

  //добавили хук истории
  const navigate = useNavigate();

  /**Открытие попапов */
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
    setIsCardPopupOpen(true);
  }
  function handleCardDeleteClick(card) {
    setSelectedCard(card);
    setIsDeleteCardPopupOpen(true);
  }
  function handleInfoTooltip() {
    setInfoSuccessOpen(true);
  }

  // закрытие попапов
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsCardPopupOpen(false);
    setSelectedCard(null);
    setIsDeleteCardPopupOpen(false);
    setInfoSuccessOpen(false);
  }

  // закрытие по ESC
  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    };
    document.addEventListener("keydown", closeByEscape);
    return () => document.removeEventListener("keydown", closeByEscape);
  }, []);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleCardDelete() {
    setIsRenderLoading(true);
    api
      .deleteCard(selectedCard._id)
      .then(() => {
        setCards((cards) =>
          cards.filter((item) => item._id !== selectedCard._id)
        );
      })
      .then(() => closeAllPopups())
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => setIsRenderLoading(false));
  }

  function handleAddCard(card) {
    setIsRenderLoading(true);
    api
      .newCardElement(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => setIsRenderLoading(false));
  }

  /**Изменяем данные пользователя*/
  function handleUpdateUser(userInfo) {
    setIsRenderLoading(true);
    api
      .editUserInfo(userInfo)
      .then((userInfoServer) => {
        setCurrentUser(userInfoServer);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => setIsRenderLoading(false));
  }

  /**Изменить аватар пользователя*/
  function handleUpdateAvatar(data) {
    setIsRenderLoading(true);
    api
      .editAvatar(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => setIsRenderLoading(false));
  }

  // Регистрация пользователи
  function handleRegistration(data) {
    return auth
      .register(data)
      .then((data) => {
        setRegisterSuccess(true);
        handleInfoTooltip();
        navigate("/sign-in");
      })
      .catch((err) => {
        console.log(err);
        setRegisterSuccess(false);
        handleInfoTooltip();
      });
  }

  // Авторизация пользователя
  function handleAuthorization(data) {
    return auth
      .login(data)
      .then((data) => {
        setLoggedIn(true);
        localStorage.setItem("jwt", data.token);
        handleTokenCheck();
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        handleInfoTooltip();
      });
  }

  // Проверка токена
  const handleTokenCheck = () => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      return;
    }
    auth
      .checkToken(token)
      .then((data) => {
        setHeaderEmail(data.data.email);
        setLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleTokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
  }, [loggedIn, navigate]);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getInitialCards(), api.getUserInfo()]);
      api
        .getUserInfo()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
      api
        .getInitialCards()
        .then((cards) => {
          setCards(cards);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }, [loggedIn]);

  // выход пользователя
  function handleSingOut() {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    setHeaderEmail("");
    navigate("/sign-in");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          loggedIn={loggedIn}
          headerEmail={headerEmail}
          onSignOut={handleSingOut}
        />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                loggedIn={loggedIn}
                onEditProfile={handleEditProfileClick}
                onEditAvatar={handleEditAvatarClick}
                onAddPlace={handleAddPlaceClick}
                cards={cards}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDeleteClick}
              />
            }
          />
          <Route
            path="/sign-in"
            element={<Login onLogin={handleAuthorization} />}
          />
          <Route
            path="/sign-up"
            element={<Register onRegister={handleRegistration} />}
          />
        </Routes>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isRenderLoading={isRenderLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddCard}
          isRenderLoading={isRenderLoading}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isCardPopupOpen}
          onClose={closeAllPopups}
        />
        <PopupWithDeleteCard
          isOpen={isDeleteCardPopapOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleCardDelete}
          isRenderLoading={isRenderLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isRenderLoading={isRenderLoading}
        />
        <InfoTooltip
          isOpen={infoSuccessOpen}
          onClose={closeAllPopups}
          name="success"
          success={registerSuccess}
        />
        <Footer loggedIn={loggedIn} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
