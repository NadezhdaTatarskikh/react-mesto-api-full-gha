import React from "react";
import PopupWithForm from "./PopupWithForm";

const PopupWithDeleteCard = ({
  isOpen,
  onClose,
  onDeleteCard,
  isRenderLoading,
}) => {
  function handleSubmit(e) {
    e.preventDefault();
    onDeleteCard();
  }
  return (
    <PopupWithForm
      name="delete-card"
      title="Вы уверены?"
      text=" Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isRenderLoading={isRenderLoading}
      renderLoadingTextBtn="Удаление..."
    />
  );
};

export default PopupWithDeleteCard;
