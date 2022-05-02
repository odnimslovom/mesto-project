import {
  cardsList,
  cardTemplate,
  cardsAddPopup,
  imagePopupImg,
  imagePopupText,
  imagePopup,
  confirmDelPopup,
  confirmDelButton,
  cardAddButton
} from "./variables.js";

import {openPopup, closePopup, clearCardsPopupInfo} from "./modal.js";
import {deleteCardData, deleteLikeData, requestCardsData, sendCardData, sendLikeData} from "./api";

export function renderStartCards(userId) {
  requestCardsData().then((data) => {
    data.forEach(card => {
      addCard(
        {
          name: card.name,
          link: card.link,
          likeCounter: card.likes.length,
          isDeletable: card.owner._id === userId,
          isLiked: card.likes.find(item => item._id === userId) !== undefined
        }, card._id);
    });
  }).catch((error) => console.log(`Error: ${error.message}!!!`));
}

function addCard(cardData, cardId) {
  const cardElement = createCardElement(cardData, cardId);
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

  if (cardData.isLiked) {
    cardLike.classList.add('cards__like_active');
  }

  cardImage.addEventListener('click', handleCardImageClick);

  cardDelete.addEventListener('click', function (evt) {
    deleteCardData(cardId)
      .then(() => {
        evt.target.closest('.cards__item').remove();
      })
      .catch((error) => console.log(`Error: ${error.message}!!!`));
  });

  cardLike.addEventListener('click', function (evt) {
    if (cardLike.classList.contains('cards__like_active')) {
      deleteLikeData(cardId)
        .then((res) => {
          cardLikesCounter.textContent = res.likes.length;
          evt.target.classList.remove('cards__like_active');
        })
        .catch((error) => console.log(`Error: ${error.message}!!!`));

    } else {
      sendLikeData(cardId)
        .then((res) => {
          cardLikesCounter.textContent = res.likes.length;
          evt.target.classList.add('cards__like_active');
        })
        .catch((error) => console.log(`Error: ${error.message}!!!`));
    }
  });

  return cardElement;
}

export function handleSubmitCardsForm(event) {
  event.preventDefault();
  cardAddButton.textContent = 'Сохранение...';
  sendCardData()
    .then((data) => {
      addCard({name: data.name, link: data.link});
      closePopup(cardsAddPopup);
    })
    .catch((error) => console.log(`Error: ${error.message}!!!`))
    .finally(() => {
      clearCardsPopupInfo();
      cardAddButton.textContent = 'Сохранить';
  });

}

function handleCardImageClick(card) {
  imagePopupImg.src = card.target.src;
  imagePopupImg.alt = card.target.alt;
  imagePopupText.textContent = card.target.alt;
  openPopup(imagePopup);
}



