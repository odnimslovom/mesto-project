import {
  cardsPopupInputLink,
  cardsPopupInputName,
  profileName,
  profilePopupInputName,
  profilePopupInputStatus,
  profileStatus
} from "./variables";

const API_URL = 'https://nomoreparties.co/v1/plus-cohort-9/';
const AUTH_TOKEN = '30ee5c2b-3c10-4367-af03-f8ff84e704e6';

export function requestUserData() {
  return fetch(API_URL + 'users/me', {
    headers: {
      authorization: AUTH_TOKEN
    }
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(`Error ${res.status}`);
      }
    });
}

export function requestCardsData() {
  return fetch(API_URL + 'cards', {
    headers: {
      authorization: AUTH_TOKEN,
      'Content-Type': 'application/json'
    }
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(`Error ${res.status}`);
      }
    });
}

export function sendUserData() {
  return fetch(API_URL + 'users/me', {
    method: 'PATCH',
    headers: {
      authorization: AUTH_TOKEN,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: profilePopupInputName.value,
      about: profilePopupInputStatus.value
    })
  });
}

export function sendCardData() {
  return fetch(API_URL + 'cards', {
    method: 'POST',
    headers: {
      authorization: AUTH_TOKEN,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: cardsPopupInputName.value,
      link: cardsPopupInputLink.value
    })
  });
}
