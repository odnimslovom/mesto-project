import {
  cardsList, cardTemplate, cardsAddPopup, imagePopupImg, imagePopupText, imagePopup, confirmDelPopup, confirmDelButton
} from "./variables.js";

import {openPopup, closePopup, clearCardsPopupInfo} from "./modal.js";
import {deleteCardData, requestCardsData, sendCardData} from "./api";

export function renderStartCards(userId) {
  requestCardsData().then((data) => {
    data.forEach(card => {
      addCard(
        {
          name: card.name,
          link: card.link,
          likeCounter: card.likes.length,
          isDeletable: card.owner._id === userId,
        }, card._id);
    });
  }).catch((error) => console.log(`Error: ${error.message}!!!`));
}

function addCard(card, cardId) {
  const cardElement = createCardElement(card, cardId);
  cardsList.prepend(cardElement);
}


function createCardElement(cardData, cardId) {
  const cardElement = cardTemplate.querySelector('.cards__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.cards__image');
  const cardTitle = cardElement.querySelector('.cards__title');
  const cardDelete = cardElement.querySelector('.cards__delete');
  const cardLike = cardElement.querySelector('.cards__like');
  const cardLikesCounter = cardElement.querySelector('.cards__like-counter');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardLikesCounter.textContent = cardData.likeCounter;
  cardTitle.textContent = cardData.name;

  if (!cardData.isDeletable) {
    cardDelete.remove();
  }

  cardImage.addEventListener('click', handleCardImageClick);
  cardDelete.addEventListener('click', function (evt) {

    deleteCardData(cardId)
      .then(() => {
        evt.target.closest('.cards__item').remove();
      })
      .catch((error) => console.log(`Error: ${error.message}!!!`));

  });
  cardLike.addEventListener('click', handleCardLikeClick);
  return cardElement;
}

export function handleSubmitCardsForm(event) {
  event.preventDefault();
  sendCardData()
    .then((data) => {
      addCard({name: data.name, link: data.link});
    })
    .catch((error) => console.log(`Error: ${error.message}!!!`));
  clearCardsPopupInfo();
  closePopup(cardsAddPopup);
}

function handleCardImageClick(card) {
  imagePopupImg.src = card.target.src;
  imagePopupImg.alt = card.target.alt;
  imagePopupText.textContent = card.target.alt;
  openPopup(imagePopup);
}

function handleCardLikeClick(evt) {
  evt.target.classList.toggle('cards__like_active');
}



