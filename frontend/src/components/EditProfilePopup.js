import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const EditProfilePopup = ({
  isOpen,
  onClose,
  onUpdateUser,
  isRenderLoading,
}) => {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  // Загружаем данные пользователя в форму.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description
    });
  }

  return (
    <PopupWithForm
      name="name_profile"
      title="Редактировать профиль"
      text="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isRenderLoading={isRenderLoading}
      renderLoadingTextBtn="Сохранение..."
    >
      <input
        type="text"
        className="popup__input popup__input_text_name"
        value={name || ''}
        onChange={handleChangeName}
        name="userName"
        placeholder="Ваше Имя"
        required
        minLength="2"
        maxLength="40"
        id="profile-name-input"
      />
      <span className="popup__error-text profile-name-input-error"></span>
      <input
        type="text"
        className="popup__input popup__input_text_job"
        value={description || ''}
        onChange={handleChangeDescription}
        name="userJob"
        placeholder="О себе"
        required
        minLength="2"
        maxLength="200"
        id="profile-job-input"
      />
      <span className="popup__error-text profile-job-input-error"></span>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
