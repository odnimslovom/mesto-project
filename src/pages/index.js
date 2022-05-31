//webpack import
import "./index.css";

import {
  addCardBtn,
  avatarEditBtn,
  avatarPopup,
  avatarPopupForm,
  cardList,
  cardsAddPopup,
  cardsPopupForm,
  cardTemplateSelector,
  imagePopup,
  profileAvatar,
  profileName,
  profilePopup,
  profilePopupForm,
  profileStatus,
  userEditBtn,
  validationOptions
} from "../utils/variables";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import UserInfo from "../components/UserInfo";
import {api} from "../components/API";
import FormValidator from "../components/FormValidator";
import Section from "../components/Section";
import Card from "../components/Card";

const avtPopup = new PopupWithForm(avatarPopup, avatarPopupForm, avatarSubmitHandler);
const usrPopup = new PopupWithForm(profilePopup, profilePopupForm, profileSubmitHandler);
const crdPopup = new PopupWithForm(cardsAddPopup, cardsPopupForm, cardSubmitHandler);
const imgPopup = new PopupWithImage(imagePopup);

avtPopup.setEventListeners();
usrPopup.setEventListeners();
crdPopup.setEventListeners();
imgPopup.setEventListeners();

avatarEditBtn.addEventListener('click', () => {
  avtPopup.resetFormErrors();
  avtPopup.open();
});

userEditBtn.addEventListener('click', () => {
  usrPopup.resetFormErrors();
  usrPopup.open();
});

addCardBtn.addEventListener('click', () => {
  crdPopup.resetFormErrors();
  crdPopup.open();
});

Array.from(document.forms).forEach(form => {
  const formValidator = new FormValidator(validationOptions, form);
  formValidator.enableValidation();
});

const userInfo = new UserInfo(profileName, profileStatus, profileAvatar);
const cardContainer = new Section({renderer: card => renderCard(card)}, cardList);

Promise.all([api.requestUserData(), api.requestCardsData()])
  .then(([userData, cardsData]) => {
    userInfo.setUserInfo(userData);
    cardContainer.renderItems(cardsData);
  }).catch((error) => console.log(`Error ${error}!!!`));

function renderCard(card) {
  const cardItem = new Card(cardTemplateSelector, card, userInfo.getUserInfo().id, api, cardClickHandler);
  return cardItem.generateCard();
}

function cardClickHandler(cardName, cardLink) {
  imgPopup.open(cardName, cardLink);
}

function profileSubmitHandler(data) {
  console.log(data);
}

function avatarSubmitHandler(data) {
  console.log(data);
}

function cardSubmitHandler(data) {
  console.log(data);
}

