// page profile
export const profile = document.querySelector('.profile');
export const userEditBtn = profile.querySelector('.profile__button_type_edit');
export const profileName = profile.querySelector('.profile__name');
export const profileStatus = profile.querySelector('.profile__status');
export const addCardBtn = profile.querySelector('.profile__button_type_add');
//avatar
export const profileAvatar = profile.querySelector('.profile__avatar');
export const avatarEditBtn = profile.querySelector('.profile__avatar-edit');
export const avatarPopup = document.querySelector('.popup_type_add-avatar');
export const avatarPopupForm = avatarPopup.querySelector('.popup__form');
export const avatarButtonSubmit = avatarPopup.querySelector('.popup__button_type_submit');
//Validation options
export const validationOptions = {
  formElementClass: '.popup__form',
  inputElementClass: '.popup__form-input',
  buttonElementClass: '.popup__button_type_submit',
  buttonInactiveElementClass: 'popup__button_type_inactive',
  inputInvalidElementClass: '.popup__form-item_type_invalid',
  errorActiveElementClass: 'popup__form-error_type_active',
};
// profile popup
export const profilePopup = document.querySelector('.popup_type_edit-profile');
export const profilePopupForm = profilePopup.querySelector('.popup__form');
export const profileButtonSubmit = profilePopup.querySelector(validationOptions.buttonElementClass);
//  cards
export const cardList = document.querySelector('.cards__list');
// add-card popup
export const cardsAddPopup = document.querySelector('.popup_type_add-card');
export const cardsPopupForm = cardsAddPopup.querySelector('.popup__form');
export const cardTemplateSelector = document.querySelector("#template__card");
export const cardAddSubmitButton = cardsAddPopup.querySelector(validationOptions.buttonElementClass);
// image popup
export const imagePopup = document.querySelector('.popup_type_show-image');
