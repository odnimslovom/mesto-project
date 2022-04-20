import {enableValidation} from "./validation.js";
import {
  validationOptions, profilePopup, profileName, profileStatus, profilePopupInputName,
  profilePopupInputStatus, cardsAddPopup, cardsPopupForm, imagePopup,
} from "./variables.js";

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  enableValidation(validationOptions);
  handlePopupCloseActions(popup);
}

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function handlePopupCloseActions(popup) {
  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      closePopup(popup);
    }
  });
  popup.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
  });
}

function updateProfileEditForm() {
  profilePopupInputName.value = profileName.textContent;
  profilePopupInputStatus.value = profileStatus.textContent;
}

export function handleProfileEditClick() {
  updateProfileEditForm();
  openPopup(profilePopup);
}

export function handleProfilePopupCloseClick() {
  closePopup(profilePopup);
}

function updateProfile() {
  profileName.textContent = profilePopupInputName.value;
  profileStatus.textContent = profilePopupInputStatus.value;
}

export function handleSubmitProfileForm(event) {
  event.preventDefault();
  updateProfile();
  closePopup(profilePopup);
}

export function handleProfileAddClick() {
  openPopup(cardsAddPopup);
}

export function handleCardsPopupClose() {
  closePopup(cardsAddPopup);
}

export function clearCardsPopupInfo() {
  cardsPopupForm.reset();
}

export function handleImagePopupClose() {
  closePopup(imagePopup);
}

