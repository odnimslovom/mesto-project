import {
  cardAddButton,
  cardInputList,
  cardsAddPopup,
  cardsList,
  cardTemplate,
  imagePopup,
  imagePopupImg,
  imagePopupText,
  validationOptions
} from "./variables";

import {openPopup, removePopupErrors} from "./modal";
import {toggleButtonState} from "./validation";
import {handleDeleteIconClick, handleLikeClick} from "./index";

// Открыть попап добавления карточки
export const handleCardAddClick = () => {
  toggleButtonState(cardInputList, cardAddButton, validationOptions);
  removePopupErrors(cardsAddPopup);
  openPopup(cardsAddPopup);
};

// Добавление карточки в DOM
export const addCard = (cardData, cardId) => {
  const cardElement = createCardElement(cardData, cardId);
  cardsList.prepend(cardElement);
};

// Удаление карточки из Dom
export const handleDeleteCard = (cardElement) => {
  cardElement.remove();
  cardElement = null;
};

// Отображение счетчика лайков
export const handleLike = (cardLike, likeCounter, numLikes) => {
  likeCounter.textContent = numLikes;
  cardLike.classList.toggle('cards__like_active');
};

// Создание карточки
const createCardElement = (cardData, cardId) => {
  const cardElement = cardTemplate.querySelector('.cards__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.cards__image');
  const cardTitle = cardElement.querySelector('.cards__title');
  const cardDelete = cardElement.querySelector('.cards__delete');
  const cardLike = cardElement.querySelector('.cards__like');
  const cardLikesCounter = cardElement.querySelector('.cards__like-counter');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardLikesCounter.textContent = isNaN(cardData.likeCounter) ? 0 : cardData.likeCounter;
  cardTitle.textContent = cardData.name;

  if (!cardData.isDeletable) {
    cardDelete.remove();
  }

  if (cardData.isLiked) {
    cardLike.classList.add('cards__like_active');
  }

  // Просмотр карточки
  cardImage.addEventListener('click', handleCardImageClick);

  // Удаление карточки
  cardDelete.addEventListener('click', () => handleDeleteIconClick(cardId, cardElement));

  //Обработка нажатия лайка
  cardLike.addEventListener('click', () => handleLikeClick(cardId, cardLike, cardLikesCounter));

  return cardElement;
};

// Просмотр карточки
const handleCardImageClick = (card) => {
  imagePopupImg.src = card.target.src;
  imagePopupImg.alt = card.target.alt;
  imagePopupText.textContent = card.target.alt;
  openPopup(imagePopup);
};



