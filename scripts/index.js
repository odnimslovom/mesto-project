"use strict";

// --------------------- Profile ------------------------

// page profile
const profile = document.querySelector('.profile');
const profileBtnEdit = profile.querySelector('.profile__button_type_edit');
const profileName = profile.querySelector('.profile__name');
const profileStatus = profile.querySelector('.profile__status');
const profileBtnAdd = profile.querySelector('.profile__button_type_add');

// profile popup
const profilePopup = document.querySelector('.popup__edit-profile');
const profilePopupBtnClose = profilePopup.querySelector('.popup__button_type_close');
const profilePopupForm = profilePopup.querySelector('.popup__form');
const profilePopupInputName = profilePopupForm.querySelector('#name');
const profilePopupInputStatus = profilePopupForm.querySelector('#status');


profileBtnEdit.addEventListener('click', function(){
  updateProfileEditForm();
  openPopup(profilePopup);
});

profilePopupBtnClose.addEventListener('click', function(){
  closePopup(profilePopup);
});

profilePopupForm.addEventListener('submit', submitProfileFormHandler);

function submitProfileFormHandler(event){
  event.preventDefault();
  updateProfileInfo();
  closePopup(profilePopup);
}

function updateProfileInfo(){
  profileName.textContent = profilePopupInputName.value;
  profileStatus.textContent = profilePopupInputStatus.value;
}

function updateProfileEditForm(){
  profilePopupInputName.value = profileName.textContent;
  profilePopupInputStatus.value = profileStatus.textContent;
}

function closePopup(popup){
  popup.classList.remove('popup_opened');
}

function openPopup(popup){
  popup.classList.add('popup_opened');
}

// --------------------- End of Profile ------------------




// --------------------- Add card ------------------------

// page cards
const cardsList = document.querySelector('.cards__list');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
  ];

// add card popup
const cardsPopup = document.querySelector('.popup__add-card');
const cardsPopupBtnClose = cardsPopup.querySelector('.popup__button_type_close');
const cardsPopupForm = cardsPopup.querySelector('.popup__form');
const cardsPopupInputName = cardsPopup.querySelector('#place');
const cardsPopupInputLink = cardsPopup.querySelector('#link');
const cardTemplate = document.querySelector("#template__card").content;

profileBtnAdd.addEventListener('click', function(){
  clearCardsPopupInfo();
  openPopup(cardsPopup);
});

cardsPopupBtnClose.addEventListener('click', function(){
  closePopup(cardsPopup);
});

cardsPopupForm.addEventListener('submit', submitCardsFormHandler);

renderCards();

function submitCardsFormHandler(event){
  event.preventDefault();
  let newCard = getCardInfo();
  initialCards.unshift(newCard);
  renderCards();
  closePopup(cardsPopup);
}

function getCardInfo(){
  const card = {};
  card.name = cardsPopupInputName.value;
  card.link = cardsPopupInputLink.value;
  return card;
}

function renderCards(){
  cardsList.innerHTML = '';
  initialCards.forEach(element => {
    addCard(element);
  });
}

function addCard(card){
  const cardElement = cardTemplate.querySelector('.cards__item').cloneNode(true);
  cardElement.querySelector('.cards__image').src = card.link;
  cardElement.querySelector('.cards__image').alt = card.name;
  cardElement.querySelector('.cards__title').textContent = card.name;
  cardElement.querySelector('.cards__delete').addEventListener('click', clickDeleteBtnHandler);
  cardElement.querySelector('.cards__like').addEventListener('click', function(evt){
    evt.target.classList.toggle('cards__like_active');
  });
  cardsList.append(cardElement);
}

function clearCardsPopupInfo(){
  cardsPopupInputName.value = '';
  cardsPopupInputLink.value = '';
}

// --------------------- End of Add card ------------------

// --------------------- Delete card ------------------
function clickDeleteBtnHandler(evt){
  initialCards.forEach( (item, index) => {
    let target = evt.target.parentElement.querySelector('img');
    if (item.name === target.alt && item.link === target.src){
      initialCards.splice(index, 1);
      renderCards();
      return;
    }
  });
}
// --------------------- End of delete card ------------------


