class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  //проверяем ответ с сервера
  _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
  }

  // Получаем карточеки с сервера
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }
  // Получаем информацию о пользователе с сервера
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  // Обновляем информацию о пользователе с сервера
  editUserInfo({ name, about }) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    }).then((res) => this._checkResponse(res));
  }

  // Редактирование аватара пользователя
  editAvatar({ avatar }) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar }),
    }).then((res) => this._checkResponse(res));
  }

  // Добавим новую карточку
  newCardElement({ name, link }) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    }).then((res) => this._checkResponse(res));
  }

  // Удаление карточки
  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  // Ставим и удаляем лайк карточке
  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  } else {
    return fetch(`${this._url}/cards/${id}/likes`,
        {
          method: 'DELETE',
          headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }
}
}

// api
const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-61",
  headers: {
    authorization: "b5e191e2-a9f1-4b65-96ec-0b7ea96da54a",
    "Content-Type": "application/json",
  },
});

export default api;