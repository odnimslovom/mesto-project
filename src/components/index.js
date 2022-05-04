"use strict";
//webpack import
import "../pages/index.css";

import {addCard, handleCardAddClick, handleDeleteCard, handleLike} from "./cards";
import {
  avatarPopup,
  cardAddButton,
  cardsAddPopup,
  cardsPopupForm,
  cardsPopupInputLink,
  cardsPopupInputName,
  profileBtnAdd,
  profileBtnAvatarEdit,
  profileBtnEdit,
  profilePopupForm,
  validationOptions,
} from "./variables";

import {enableValidation} from "./validation";
import {
  getUserData,
  handleProfileAvatarEditClick,
  handleProfileEditClick,
  handleSubmitAvatar,
  handleSubmitProfileForm,
} from "./profile";
import {deleteCardData, deleteLikeData, requestCardsData, sendCardData, sendLikeData} from "./api";
import {clearPopupForm, closePopup} from "./modal";

// Серверная обработка нажатия на корзину
const handleDeleteIconClick = (cardId, cardElement) => {
  deleteCardData(cardId)
    .then(() => handleDeleteCard(cardElement))
    .catch((error) => console.log(`Error: ${error.message}!!!`));
};

// Серверная обработка нажатия на лайк
const handleLikeClick = (cardId, cardLike, cardLikesCounter) => {
  if (cardLike.classList.contains('cards__like_active')) {
    deleteLikeData(cardId)
      .then((res) => {
        handleLike(cardLike, cardLikesCounter, res.likes.length);
      })
      .catch((error) => console.log(`Error: ${error.message}!!!`));
  } else {
    sendLikeData(cardId)
      .then((res) => {
        handleLike(cardLike, cardLikesCounter, res.likes.length);
      })
      .catch((error) => console.log(`Error: ${error.message}!!!`));
  }
};

// Загрузка и отрисовка начавльных карточек
export const renderStartCards = (userId) => {
  requestCardsData().then((data) => {
    data.reverse().forEach(card => {
      addCard(
        {
          name: card.name,
          link: card.link,
          likeCounter: card.likes.length,
          isDeletable: card.owner._id === userId,
          isLiked: card.likes.find(item => item._id === userId) !== undefined
        }, card._id, handleDeleteIconClick, handleLikeClick);
    });
  }).catch((error) => console.log(`Error: ${error.message}!!!`));
};

// Сохранить карточку
const handleSubmitCardsForm = (event) => {
  event.preventDefault();
  cardAddButton.textContent = 'Сохранение...';
  sendCardData(cardsPopupInputName.value, cardsPopupInputLink.value)
    .then((data) => {
      addCard({name: data.name, link: data.link, isDeletable: true},
        data._id, handleDeleteIconClick, handleLikeClick);
      closePopup(cardsAddPopup);
    })
    .catch((error) => console.log(`Error: ${error.message}!!!`))
    .finally(() => {
      clearPopupForm(cardsPopupForm);
      cardAddButton.textContent = 'Сохранить';
    });
};

profileBtnEdit.addEventListener('click', handleProfileEditClick);
profileBtnAvatarEdit.addEventListener('click', handleProfileAvatarEditClick);
profileBtnAdd.addEventListener('click', handleCardAddClick);
profilePopupForm.addEventListener('submit', handleSubmitProfileForm);
cardsPopupForm.addEventListener('submit', handleSubmitCardsForm);
avatarPopup.addEventListener('submit', handleSubmitAvatar);

getUserData();
enableValidation(validationOptions);

