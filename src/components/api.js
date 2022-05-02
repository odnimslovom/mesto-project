import {
  avatarPopupInputLink,
  cardsPopupInputLink,
  cardsPopupInputName,
  profilePopupInputName,
  profilePopupInputStatus,
} from "./variables";

const API_URL = 'https://nomoreparties.co/v1/plus-cohort-9/';
const AUTH_TOKEN = '30ee5c2b-3c10-4367-af03-f8ff84e704e6';

// const config = {
//   baseUrl: 'https://nomoreparties.co/v1/cohort-42',
//   headers: {
//     authorization: '30ee5c2b-3c10-4367-af03-f8ff84e704e6',
//     'Content-Type': 'application/json'
//   }
// };

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
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error(`Error ${res.status}`);
    }
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
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error(`Error ${res.status}`);
    }
  });
}

export function deleteCardData(cardId) {
  return fetch(API_URL + `cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: AUTH_TOKEN,
      'Content-Type': 'application/json'
    }
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`Error ${res.status}`);
    }
  });
}

export function sendLikeData(cardId) {
  return fetch(API_URL + `cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: AUTH_TOKEN,
      'Content-Type': 'application/json'
    }

  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error(`Error ${res.status}`);
    }
  });
}

export function deleteLikeData(cardId) {
  return fetch(API_URL + `cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: AUTH_TOKEN,
      'Content-Type': 'application/json'
    }

  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error(`Error ${res.status}`);
    }
  });
}

export function sendAvatarData() {
  return fetch(API_URL + 'users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: AUTH_TOKEN,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar : avatarPopupInputLink.value,
    })
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error(`Error ${res.status}`);
    }
  });
}
