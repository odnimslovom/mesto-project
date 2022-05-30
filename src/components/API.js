export default class API {
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
    return fetch(this._apiConfig.API_URL + 'users/me', {
      headers: {
        authorization: this._apiConfig.AUTH_TOKEN
      }
    }).then(this._checkResponse());
  }

  // Запрос дынных карточек
  requestCardsData() {
    return fetch(this._apiConfig.API_URL + 'cards', {
      headers: {
        authorization: this._apiConfig.AUTH_TOKEN,
        'Content-Type': 'application/json'
      }
    }).then(this._checkResponse());
  }

  // Обновление данных профиля
  sendUserData(userName, userStatus) {
    return fetch(this._apiConfig.API_URL + 'users/me', {
      method: 'PATCH',
      headers: {
        authorization: this._apiConfig.AUTH_TOKEN,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: userName,
        about: userStatus
      })
    }).then(this._checkResponse());
  }

  // Добавление карточки
  sendCardData(cardName, cardLink) {
    return fetch(this._apiConfig.API_URL + 'cards', {
      method: 'POST',
      headers: {
        authorization: this._apiConfig.AUTH_TOKEN,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: cardName,
        link: cardLink
      })
    }).then(this._checkResponse());
  }

  // Удаление карточки
  deleteCardData(cardId) {
    return fetch(this._apiConfig.API_URL + `cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._apiConfig.AUTH_TOKEN,
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      if (!res.ok) {
        return Promise.reject(`Error ${res.status}`);
      }
    });
  }

  // Добавить лайк карточке
  sendLikeData(cardId) {
    return fetch(this._apiConfig.API_URL + `cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: this._apiConfig.AUTH_TOKEN,
        'Content-Type': 'application/json'
      }
    }).then(this._checkResponse());
  }

  // Убрать лайк у карточки
  deleteLikeData(cardId) {
    return fetch(this._apiConfig.API_URL + `cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._apiConfig.AUTH_TOKEN,
        'Content-Type': 'application/json'
      }
    }).then(this._checkResponse());
  }

  // Обновление аватара
  sendAvatarData(avatarLink) {
    return fetch(this._apiConfig.API_URL + 'users/me/avatar', {
      method: 'PATCH',
      headers: {
        authorization: this._apiConfig.AUTH_TOKEN,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatarLink,
      })
    }).then(this._checkResponse());
  }
}
