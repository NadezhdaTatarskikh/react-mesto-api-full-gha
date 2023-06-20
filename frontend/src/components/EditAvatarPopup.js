import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const EditAvatarPopup = ({
  isOpen,
  onClose,
  onUpdateAvatar,
  isRenderLoading,
}) => {
  const currentUser = React.useContext(CurrentUserContext);
  const avatarRef = React.useRef(currentUser.avatar);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  /**Очищаем форму от предыдущей ссылки */
  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      text="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isRenderLoading={isRenderLoading}
      renderLoadingTextBtn="Обновление..."
    >
      <input
        type="url"
        className="popup__input popup__input_edit_avatar"
        name="avatar"
        placeholder="Ссылка на аватар"
        required
        id="avatar-url-input"
        ref={avatarRef}
      />
      <span className="popup__error-text avatar-url-input-error"></span>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
