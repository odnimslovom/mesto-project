export const validationOptions = {
  formElementClass: '.popup__form',
  inputElementClass: '.popup__form-input',
  buttonElementClass: '.popup__button_type_submit',
  buttonInactiveElementClass: 'popup__button_type_inactive',
  inputInvalidElementClass: '.popup__form-item_type_invalid',
  errorActiveElementClass: 'popup__form-error_type_active',
};

export const popups = document.querySelectorAll('.popup');
// page profile
export const profile = document.querySelector('.profile');
export const profileBtnEdit = profile.querySelector('.profile__button_type_edit');
export const profileName = profile.querySelector('.profile__name');
export const profileStatus = profile.querySelector('.profile__status');
export const profileBtnAdd = profile.querySelector('.profile__button_type_add');
//avatar
export const profileAvatar = profile.querySelector('.profile__avatar');
export const profileBtnAvatarEdit = profile.querySelector('.profile__avatar-edit');
export const avatarPopup = document.querySelector('.popup_type_add-avatar');
export const avatartPopupForm = avatarPopup.querySelector('.popup__form');
export const avatarPopupInputLink = avatarPopup.querySelector('.popup__form-item_type_link');
export const avatarButtonSubmit = avatarPopup.querySelector('.popup__button_type_submit');
// profile popup
export const profilePopup = document.querySelector('.popup_type_edit-profile');
export const profilePopupForm = profilePopup.querySelector('.popup__form');
export const profilePopupInputName = profilePopupForm.querySelector('.popup__form-item_type_name');
export const profilePopupInputStatus = profilePopupForm.querySelector('.popup__form-item_type_status');
export const profileInputList = Array.from(profilePopup.querySelectorAll(validationOptions.inputElementClass));
export const profileButtonSubmit = profilePopup.querySelector(validationOptions.buttonElementClass);
//  cards
export const cardsList = document.querySelector('.cards__list');
export const confirmDelPopup = document.querySelector('.popup_type_confirm');
export const confirmDelButton = confirmDelPopup.querySelector('.popup__button_type_submit');
// add-card popup
export const cardsAddPopup = document.querySelector('.popup_type_add-card');
export const cardsPopupForm = cardsAddPopup.querySelector('.popup__form');
export const cardsPopupInputName = cardsAddPopup.querySelector('.popup__form-item_type_name');
export const cardsPopupInputLink = cardsAddPopup.querySelector('.popup__form-item_type_link');
export const cardTemplate = document.querySelector("#template__card").content;
export const cardInputList = Array.from(cardsAddPopup.querySelectorAll(validationOptions.inputElementClass));
export const cardAddButton = cardsAddPopup.querySelector(validationOptions.buttonElementClass);
// image popup
export const imagePopup = document.querySelector('.popup_type_show-image');
export const imagePopupImg = imagePopup.querySelector('.popup__image');
export const imagePopupText = imagePopup.querySelector('.popup__text');
// api variables
export const API_URL = 'https://nomoreparties.co/v1/plus-cohort-9/';
export const AUTH_TOKEN = '30ee5c2b-3c10-4367-af03-f8ff84e704e6';
