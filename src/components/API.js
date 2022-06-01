class API {
  constructor(apiConfig) {
    this._apiConfig = apiConfig;
  }

  // Проверка ответа сервера
  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(`Error ${response.status}`);
    }
  }

  // Запрос данных профиля
  requestUserData() {
    return fetch(this._apiConfig.baseUrl + 'users/me', {
      headers: this._apiConfig.headers
    }).then(this._checkResponse);
  }

  // Запрос дынных карточек
  requestCardsData() {
    return fetch(this._apiConfig.baseUrl + 'cards', {
      headers: this._apiConfig.headers
    }).then(this._checkResponse);
  }

  // Обновление данных профиля
  sendUserData(userName, userStatus) {
    return fetch(this._apiConfig.baseUrl + 'users/me', {
      method: 'PATCH',
      headers: this._apiConfig.headers,
      body: JSON.stringify({
        name: userName,
        about: userStatus
      })
    }).then(this._checkResponse);
  }

  // Добавление карточки
  sendCardData(cardName, cardLink) {
    return fetch(this._apiConfig.baseUrl + 'cards', {
      method: 'POST',
      headers: this._apiConfig.headers,
      body: JSON.stringify({
        name: cardName,
        link: cardLink
      })
    }).then(this._checkResponse);
  }

  // Удаление карточки
  deleteCardData(cardId) {
    return fetch(this._apiConfig.baseUrl + `cards/${cardId}`, {
      method: 'DELETE',
      headers: this._apiConfig.headers
    }).then((res) => {
      if (!res.ok) {
        return Promise.reject(`Error ${res.status}`);
      }
    });
  }

  // Добавить лайк карточке
  sendLikeData(cardId) {
    return fetch(this._apiConfig.baseUrl + `cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._apiConfig.headers
    }).then(this._checkResponse);
  }

  // Убрать лайк у карточки
  deleteLikeData(cardId) {
    return fetch(this._apiConfig.baseUrl + `cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._apiConfig.headers
    }).then(this._checkResponse);
  }

  // Обновление аватара
  sendAvatarData(avatarLink) {
    return fetch(this._apiConfig.baseUrl + 'users/me/avatar', {
      method: 'PATCH',
      headers: this._apiConfig.headers,
      body: JSON.stringify({
        avatar: avatarLink,
      })
    }).then(this._checkResponse);
  }
}

export const api = new API({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-9/',
  headers: {
    authorization: '30ee5c2b-3c10-4367-af03-f8ff84e704e6',
    'Content-Type': 'application/json'
  }
});

