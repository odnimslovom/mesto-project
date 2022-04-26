import {
  cardsList, cardTemplate, cardsPopupInputName, cardsPopupInputLink,
  cardsAddPopup, imagePopupImg, imagePopupText, imagePopup
} from "./variables.js";

import {openPopup, closePopup, clearCardsPopupInfo} from "./modal.js";
import {requestCardsData, sendCardData} from "./api";

export function renderStartCards() {
  requestCardsData().then((data) => {
    data.forEach(cardElement => addCard({name: cardElement.name, link: cardElement.link}));
  }).catch((error) => console.log(`Error: ${error.message}!!!`));
}

function addCard(card) {
  const cardElement = createCardElement(card);
  cardsList.append(cardElement);
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

export function handleSubmitCardsForm(event) {
  event.preventDefault();
  sendCardData().then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error(`Error ${res.status}`);
    }
  }).then((data) => {
    addCard({name : data.name, link: data.link});
  }).catch((error) => console.log(`Error: ${error.message}!!!`));
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



