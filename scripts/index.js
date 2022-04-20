"use strict";

import {cards} from "./cards.js";
// page profile
const profile = document.querySelector('.profile');
const profileBtnEdit = profile.querySelector('.profile__button_type_edit');
const profileName = profile.querySelector('.profile__name');
const profileStatus = profile.querySelector('.profile__status');
const profileBtnAdd = profile.querySelector('.profile__button_type_add');
// profile popup
const profilePopup = document.querySelector('.popup_type_edit-profile');
const profilePopupBtnClose = profilePopup.querySelector('.popup__button_type_close');
const profilePopupForm = profilePopup.querySelector('.popup__form');
const profilePopupInputName = profilePopupForm.querySelector('.popup__form-item_type_name');
const profilePopupInputStatus = profilePopupForm.querySelector('.popup__form-item_type_status');
//  cards
const cardsList = document.querySelector('.cards__list');
// add-card popup
const cardsPopup = document.querySelector('.popup_type_add-card');
const cardsPopupBtnClose = cardsPopup.querySelector('.popup__button_type_close');
const cardsPopupForm = cardsPopup.querySelector('.popup__form');
const cardsPopupInputName = cardsPopup.querySelector('.popup__form-item_type_name');
const cardsPopupInputLink = cardsPopup.querySelector('.popup__form-item_type_link');
const cardTemplate = document.querySelector("#template__card").content;
// image popup
const imagePopup = document.querySelector('.popup_type_show-image');
const imagePopupImg = imagePopup.querySelector('.popup__image');
const imagePopupText = imagePopup.querySelector('.popup__text');
const imagePopupBtnClose = imagePopup.querySelector('.popup__button_type_close');

const validationOptions = {
  formElementClass : '.popup__form',
  inputElementClass: '.popup__form-input',
  buttonElementClass: '.popup__button_type_submit',
  buttonInactiveElementClass: 'popup__button_type_inactive',
  inputInvalidElementClass: '.popup__form-item_type_invalid',
  errorActiveElementClass: 'popup__form-error_type_active',
};



function handlePopupCloseActions(popup) {
  document.addEventListener('keydown', function (evt){
    if (evt.key === 'Escape') {
      closePopup(popup);
    }
  });
  popup.addEventListener('click', function (evt){
    if (evt.target.classList.contains('popup_opened')){
      closePopup(popup);
    }
  });
}

function openPopup(popup) {
  enableValidation(validationOptions);
  popup.classList.add('popup_opened');
  handlePopupCloseActions(popup);
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function updateProfileEditForm() {
  profilePopupInputName.value = profileName.textContent;
  profilePopupInputStatus.value = profileStatus.textContent;
}
function handleProfileEditClick() {
  updateProfileEditForm();
  openPopup(profilePopup);
}
function handleProfilePopupCloseClick() {
  closePopup(profilePopup);
}
function updateProfile() {
  profileName.textContent = profilePopupInputName.value;
  profileStatus.textContent = profilePopupInputStatus.value;
}
function handleSubmitProfileForm(event) {
  event.preventDefault();
  updateProfile();
  closePopup(profilePopup);
}

function handleProfileAddClick() {
  openPopup(cardsPopup);
}
function handleCardsPopupClose() {
  closePopup(cardsPopup);
}
function clearCardsPopupInfo() {
  cardsPopupForm.reset();
}
function getCardInfo() {
  return {
    name: cardsPopupInputName.value,
    link: cardsPopupInputLink.value
  };
}
function handleSubmitCardsForm(event) {
  event.preventDefault();
  const newCard = getCardInfo();
  addCard(newCard);
  clearCardsPopupInfo();
  closePopup(cardsPopup);
}

function handleCardImageClick(card) {
  imagePopupImg.src = card.target.src;
  imagePopupImg.alt = card.target.alt;
  imagePopupText.textContent = card.target.alt;
  openPopup(imagePopup);
}
function handleImagePopupClose() {
  closePopup(imagePopup);
}
function handleCardDeleteClick(evt) {
  evt.target.closest('.cards__item').remove();
}
function handleCardLikeClick(evt) {
  evt.target.classList.toggle('cards__like_active');
}
function createCardElement(cardData){
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
function addCard(card) {
  const cardElement = createCardElement(card);
  cardsList.prepend(cardElement);
}

function renderStartCards() {
  cards.forEach(card => {
    addCard(card);
  });
}

//profile
profileBtnEdit.addEventListener('click', handleProfileEditClick);
profileBtnAdd.addEventListener('click', handleProfileAddClick);
profilePopupBtnClose.addEventListener('click', handleProfilePopupCloseClick);
profilePopupForm.addEventListener('submit', handleSubmitProfileForm);
// add card
cardsPopupBtnClose.addEventListener('click', handleCardsPopupClose);
cardsPopupForm.addEventListener('submit', handleSubmitCardsForm);
// show card image popup
imagePopupBtnClose.addEventListener('click', handleImagePopupClose);

renderStartCards();



function hasInvalidInput(inputList) {
  return inputList.some( inputElement => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, validationOptions) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationOptions.buttonInactiveElementClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(validationOptions.buttonInactiveElementClass);
    buttonElement.disabled = false;
  }
}

function showInputError(formElement, inputElement, errorMessage, validationOptions) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(validationOptions.inputInvalidElementClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationOptions.errorActiveElementClass);
}

function hideInputError(formElement, inputElement, validationOptions) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(validationOptions.inputInvalidElementClass);
  errorElement.classList.remove(validationOptions.errorActiveElementClass);
  errorElement.textContent = '';
}

function checkInputValidity(formElement, inputElement, validationOptions) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage ,validationOptions);
  } else {
    hideInputError(formElement, inputElement, validationOptions);
  }
}

function setEventListeners(formElement, validationOptions) {
  const inputList = Array.from(formElement.querySelectorAll(validationOptions.inputElementClass));
  const buttonElement = formElement.querySelector(validationOptions.buttonElementClass);
  toggleButtonState(inputList, buttonElement, validationOptions);

  inputList.forEach( inputElement => {
    inputElement.addEventListener('input', function (){
      checkInputValidity(formElement, inputElement, validationOptions);
      toggleButtonState(inputList, buttonElement, validationOptions);
    });
  });
}

function enableValidation(validationOptions){
  const formList = Array.from(document.querySelectorAll(validationOptions.formElementClass));
  formList.forEach( formElement => {
    formElement.addEventListener('submit', function (evt){
      evt.preventDefault();
    });
    setEventListeners(formElement, validationOptions);
  });
}


