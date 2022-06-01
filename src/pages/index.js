// webpack import.........................................//
import "./index.css";
//........................................................//

// Переменные.............................................//
import {
  addCardBtn, avatarButtonSubmit,
  avatarEditBtn,
  avatarPopup,
  avatarPopupForm, cardAddSubmitButton,
  cardList,
  cardsAddPopup,
  cardsPopupForm,
  cardTemplateSelector,
  imagePopup,
  profileAvatar, profileButtonSubmit,
  profileName,
  profilePopup,
  profilePopupForm,
  profileStatus,
  userEditBtn,
  validationOptions
} from "../utils/constants";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import UserInfo from "../components/UserInfo";
import {api} from "../components/API";
import FormValidator from "../components/FormValidator";
import Section from "../components/Section";
import Card from "../components/Card";
//........................................................//

// Настройка попапов......................................//
const avtPopup = new PopupWithForm(avatarPopup, avatarPopupForm, avatarButtonSubmit, avatarSubmitHandler);
const avtPopupFormValidator = new FormValidator(validationOptions, avatarPopupForm);
avtPopupFormValidator.enableValidation();
avtPopup.setEventListeners();

const usrPopup = new PopupWithForm(profilePopup, profilePopupForm, profileButtonSubmit, profileSubmitHandler);
const usrPopupFormValidator = new FormValidator(validationOptions, profilePopupForm);
usrPopupFormValidator.enableValidation();
usrPopup.setEventListeners();

const crdPopup = new PopupWithForm(cardsAddPopup, cardsPopupForm, cardAddSubmitButton, cardSubmitHandler);
const crdPopupFormValidator = new FormValidator(validationOptions, cardsPopupForm);
crdPopupFormValidator.enableValidation();
crdPopup.setEventListeners();

const imgPopup = new PopupWithImage(imagePopup);
imgPopup.setEventListeners();
//.........................................................//


// Установка обработчиков кнопок...........................//
avatarEditBtn.addEventListener('click', () => {
  avtPopupFormValidator.resetFormErrors();
  avtPopup.open();
});

userEditBtn.addEventListener('click', () => {
  usrPopupFormValidator.resetFormErrors();
  usrPopup.open();
  usrPopup.setFormData(userInfo.getUserInfo());
});

addCardBtn.addEventListener('click', () => {
  crdPopupFormValidator.resetFormErrors();
  crdPopup.open();
});
//.........................................................//


// Загрузка профиля и стартовых карточек...................//
const userInfo = new UserInfo(profileName, profileStatus, profileAvatar);
const cardContainer = new Section({renderer: card => renderCard(card)}, cardList);
Promise.all([api.requestUserData(), api.requestCardsData()])
  .then(([userData, cardsData]) => {
    userInfo.setUserInfo(userData);
    cardContainer.renderItems(cardsData.reverse());
  }).catch((error) => console.log(`Error ${error}!!!`));

function renderCard(card) {
  const cardItem = new Card(cardTemplateSelector, card, userInfo.getUserInfo().id, api, cardClickHandler);
  return cardItem.generateCard();
}
//.........................................................//

// Обработчики сабмитов форм...............................//
function cardClickHandler(cardName, cardLink) {
  imgPopup.open(cardName, cardLink);
}

function profileSubmitHandler(data) {
  usrPopup.renderSubmitter(true);
  api.sendUserData(data.name, data.about)
    .then((data) => {
      userInfo.setUserInfo(data);
      usrPopup.close();
    })
    .catch((error) => console.log(`Error ${error}!!!`))
    .finally(() => usrPopup.renderSubmitter(false));
}

function avatarSubmitHandler(data) {
  avtPopup.renderSubmitter(true);
  api.sendAvatarData(data.avatar)
    .then((data) => {
      userInfo.setUserInfo(data);
      avtPopup.close();
    })
    .catch((error) => console.log(`Error ${error}!!!`))
    .finally(() => avtPopup.renderSubmitter(false));
  avtPopup.resetFormData();
}

function cardSubmitHandler(data) {
  crdPopup.renderSubmitter(true);
  api.sendCardData(data.place, data.url)
    .then((data) => {
      cardContainer.addItem(data);
      crdPopup.close();
    })
    .catch((error) => console.log(`Error ${error}!!!`))
    .finally(() => crdPopup.renderSubmitter(false));
  crdPopup.resetFormData();
}
//.........................................................//
