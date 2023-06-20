import React from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  ///Подписка на контекст/
  const currentUser = React.useContext(CurrentUserContext);
  const { name, about, avatar } = currentUser;

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container-avatar">
          <button
            type="button"
            aria-label="Кнопка редактировать аватара"
            className="profile__btn-avatar"
            onClick={onEditAvatar}
          ></button>
          <img
            className="profile__avatar"
            src={avatar}
            alt="Фотография профиля"
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{name}</h1>
          <button
            className="profile__edit"
            onClick={onEditProfile}
            type="button"
            name="addEdit"
            aria-label="Кнопка редактировать профиль"
          ></button>
          <p className="profile__job">{about}</p>
        </div>
        <button
          className="profile__add-button"
          onClick={onAddPlace}
          type="button"
          name="addCard"
          aria-label="Кнопка добавить фото"
        ></button>
      </section>
      <section className="photos">
        <ul className="photo-grid">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
