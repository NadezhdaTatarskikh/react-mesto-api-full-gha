import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  console.log("currentUser: ", currentUser);
  console.log("card: ", card);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `photo-grid__button ${
    isLiked ? "photo-grid__button_active" : ""
  }`;

  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="photo-grid__item">
      {isOwn && (
        <button
          className="photo-grid__delete"
          type="button"
          aria-label="Кнопка для Удаления"
          onClick={handleDeleteClick}
        ></button>
      )}
      <img
        className="photo-grid__image"
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
      />
      <div className="photo-grid__option">
        <h2 className="photo-grid__text">{card.name}</h2>
        <div className="photo-grid__like-container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            name="addLike"
            aria-label="Кнопка нравится"
            onClick={handleLikeClick}
          ></button>
          <span className="photo-grid__like">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
