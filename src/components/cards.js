import {
  cardAddButton,
  cardInputList,
  cardsAddPopup,
  cardsList,
  cardsPopupForm,
  cardsPopupInputLink,
  cardsPopupInputName,
  cardTemplate,
  imagePopup,
  imagePopupImg,
  imagePopupText,
  validationOptions
} from "../utils/variables";

import {clearPopupForm, closePopup, openPopup, removePopupErrors} from "./modal";
import {deleteCardData, deleteLikeData, requestCardsData, sendCardData, sendLikeData} from "./API";
import {toggleButtonState} from "./FormValidator";

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
        }, card._id);
    });
  }).catch((error) => console.log(`Error: ${error.message}!!!`));
};

// Открыть попап добавления карточки
export const handleCardAddClick = () => {
  toggleButtonState(cardInputList, cardAddButton, validationOptions);
  removePopupErrors(cardsAddPopup);
  openPopup(cardsAddPopup);
};

// Добавление карточки в DOM
const addCard = (cardData, cardId) => {
  const cardElement = createCardElement(cardData, cardId);
  cardsList.prepend(cardElement);
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
  cardDelete.addEventListener('click', function (evt) {
    deleteCardData(cardId)
      .then(() => {
        evt.target.closest('.cards__item').remove();
      })
      .catch((error) => console.log(`Error: ${error.message}!!!`));
  });

  // Установка и удаление лайка
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
};

// Сохранить карточку
export const handleSubmitCardsForm = (event) => {
  event.preventDefault();
  cardAddButton.textContent = 'Сохранение...';
  sendCardData(cardsPopupInputName.value, cardsPopupInputLink.value)
    .then((data) => {
      addCard({name: data.name, link: data.link});
      closePopup(cardsAddPopup);
    })
    .catch((error) => console.log(`Error: ${error.message}!!!`))
    .finally(() => {
      clearPopupForm(cardsPopupForm);
      cardAddButton.textContent = 'Сохранить';
    });

};

// Просмотр карточки
const handleCardImageClick = (card) => {
  imagePopupImg.src = card.target.src;
  imagePopupImg.alt = card.target.alt;
  imagePopupText.textContent = card.target.alt;
  openPopup(imagePopup);
};



