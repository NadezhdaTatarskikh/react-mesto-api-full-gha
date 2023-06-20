import React from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = ({ isOpen, onClose, onAddPlace, isRenderLoading }) => {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name,
      link,
    });
  }

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  return (
    <PopupWithForm
      name="name_photo"
      title="Новое место"
      text="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isRenderLoading={isRenderLoading}
      renderLoadingTextBtn="Добавление..."
    >
      <input
        type="text"
        className="popup__input popup__input_text_title"
        name="name"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        id="photo-title-input"
        onChange={handleChangeName}
        value={name}
      />
      <span className="popup__error-text photo-title-input-error"></span>
      <input
        type="url"
        className="popup__input popup__input_text_link"
        name="link"
        placeholder="Ссылка на картинку"
        id="photo-url-input"
        required
        onChange={handleChangeLink}
        value={link}
      />
      <span className="popup__error-text photo-url-input-error"></span>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
