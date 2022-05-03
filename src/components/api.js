// Запрос данных профиля
import {API_URL, AUTH_TOKEN} from "./variables";

// Проверка ответа сервера
const checkResponse = (response) => {
  if (response.ok) {
    return response.json();
  } else {
    return Promise.reject(`Error ${response.status}`);
  }
};

// Запрос данных профиля
export const requestUserData = () => {
  return fetch(API_URL + 'users/me', {
    headers: {
      authorization: AUTH_TOKEN
    }
  })
    .then(checkResponse);
};

// Запрос дынных карточек
export const requestCardsData = () => {
  return fetch(API_URL + 'cards', {
    headers: {
      authorization: AUTH_TOKEN,
      'Content-Type': 'application/json'
    }
  }).then(checkResponse);
};

// Обновление данных профиля
export const sendUserData = (userName, userStatus) => {
  return fetch(API_URL + 'users/me', {
    method: 'PATCH',
    headers: {
      authorization: AUTH_TOKEN,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: userName,
      about: userStatus
    })
  }).then(checkResponse);
};

// Добавление карточки
export const sendCardData = (cardName, cardLink) => {
  return fetch(API_URL + 'cards', {
    method: 'POST',
    headers: {
      authorization: AUTH_TOKEN,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: cardName,
      link: cardLink
    })
  }).then(checkResponse);
};

// Удаление карточки
export const deleteCardData = (cardId) => {
  return fetch(API_URL + `cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: AUTH_TOKEN,
      'Content-Type': 'application/json'
    }
  }).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Error ${res.status}`);
    }
  });
};

// Добавить лайк карточке
export const sendLikeData = (cardId) => {
  return fetch(API_URL + `cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: AUTH_TOKEN,
      'Content-Type': 'application/json'
    }
  }).then(checkResponse);
};

// Убрать лайк у карточки
export const deleteLikeData = (cardId) => {
  return fetch(API_URL + `cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: AUTH_TOKEN,
      'Content-Type': 'application/json'
    }
  }).then(checkResponse);
};

// Обновление аватара
export const sendAvatarData = (avatarLink) => {
  return fetch(API_URL + 'users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: AUTH_TOKEN,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: avatarLink,
    })
  }).then(checkResponse);
};
