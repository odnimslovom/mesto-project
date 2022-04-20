export const validationOptions = {
  formElementClass: '.popup__form',
  inputElementClass: '.popup__form-input',
  buttonElementClass: '.popup__button_type_submit',
  buttonInactiveElementClass: 'popup__button_type_inactive',
  inputInvalidElementClass: '.popup__form-item_type_invalid',
  errorActiveElementClass: 'popup__form-error_type_active',
};
export const errorList = document.querySelectorAll('.popup__form-error');
// page profile
export const profile = document.querySelector('.profile');
export const profileBtnEdit = profile.querySelector('.profile__button_type_edit');
export const profileName = profile.querySelector('.profile__name');
export const profileStatus = profile.querySelector('.profile__status');
export const profileBtnAdd = profile.querySelector('.profile__button_type_add');
// profile popup
export const profilePopup = document.querySelector('.popup_type_edit-profile');
export const profilePopupBtnClose = profilePopup.querySelector('.popup__button_type_close');
export const profilePopupForm = profilePopup.querySelector('.popup__form');
export const profilePopupInputName = profilePopupForm.querySelector('.popup__form-item_type_name');
export const profilePopupInputStatus = profilePopupForm.querySelector('.popup__form-item_type_status');
//  cards
export const cardsList = document.querySelector('.cards__list');
export const initialCards = [
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
// add-card popup
export const cardsAddPopup = document.querySelector('.popup_type_add-card');
export const cardsPopupBtnClose = cardsAddPopup.querySelector('.popup__button_type_close');
export const cardsPopupForm = cardsAddPopup.querySelector('.popup__form');
export const cardsPopupInputName = cardsAddPopup.querySelector('.popup__form-item_type_name');
export const cardsPopupInputLink = cardsAddPopup.querySelector('.popup__form-item_type_link');
export const cardTemplate = document.querySelector("#template__card").content;
// image popup
export const imagePopup = document.querySelector('.popup_type_show-image');
export const imagePopupImg = imagePopup.querySelector('.popup__image');
export const imagePopupText = imagePopup.querySelector('.popup__text');
export const imagePopupBtnClose = imagePopup.querySelector('.popup__button_type_close');
