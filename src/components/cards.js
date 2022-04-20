import {
  initialCards, cardsList, cardTemplate, cardsPopupInputName, cardsPopupInputLink,
  cardsAddPopup, imagePopupImg, imagePopupText, imagePopup
} from "./variables.js";

import {openPopup, closePopup, clearCardsPopupInfo} from "./modal.js";

export function renderStartCards() {
  initialCards.forEach(card => {
    addCard(card);
  });
}

function addCard(card) {
  const cardElement = createCardElement(card);
  cardsList.prepend(cardElement);
}

function createCardElement(cardData) {
  const cardElement = cardTemplate.querySelector('.cards__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.cards__image');
  const cardTitle = cardElement.querySelector('.cards__title');
  const cardDelete = cardElement.querySelector('.cards__delete');
  const cardLike = cardElement.querySelector('.cards__like');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardImage.addEventListener('click', handleCardImageClick);
  cardTitle.textContent = cardData.name;
  cardDelete.addEventListener('click', handleCardDeleteClick);
  cardLike.addEventListener('click', handleCardLikeClick);

  return cardElement;
}

function getCardInfo() {
  return {
    name: cardsPopupInputName.value,
    link: cardsPopupInputLink.value
  };
}

export function handleSubmitCardsForm(event) {
  event.preventDefault();
  const newCard = getCardInfo();
  addCard(newCard);
  clearCardsPopupInfo();
  closePopup(cardsAddPopup);
}

function handleCardImageClick(card) {
  imagePopupImg.src = card.target.src;
  imagePopupImg.alt = card.target.alt;
  imagePopupText.textContent = card.target.alt;
  openPopup(imagePopup);
}

function handleCardDeleteClick(evt) {
  evt.target.closest('.cards__item').remove();
}

function handleCardLikeClick(evt) {
  evt.target.classList.toggle('cards__like_active');
}



