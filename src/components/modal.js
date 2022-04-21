import {
  profilePopup,
  profileName,
  profileStatus,
  profilePopupInputName,
  profilePopupInputStatus,
  cardsAddPopup,
  cardsPopupForm,
  validationOptions,
  popups,
  cardInputList,
  cardAddButton,
  profileInputList, profileButtonSubmit,
} from "./variables.js";
import {toggleButtonState} from "./validation";

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__button_type_close')) {
      closePopup(popup);
    }
  });
});

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
}

function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function updateProfileEditForm() {
  profilePopupInputName.value = profileName.textContent;
  profilePopupInputStatus.value = profileStatus.textContent;
}

function removePopupErrors(popup) {
  const errorList = popup.querySelectorAll('.popup__form-error');
  errorList.forEach(errorItem => {
      if (popup.contains(errorItem)) {
        errorItem.classList.remove('popup__form-error_type_active');
      }
    }
  );
}

export function handleProfileEditClick() {
  updateProfileEditForm();
  toggleButtonState(profileInputList, profileButtonSubmit, validationOptions);
  removePopupErrors(profilePopup);
  openPopup(profilePopup);
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
  toggleButtonState(cardInputList, cardAddButton, validationOptions);
  removePopupErrors(cardsAddPopup);
  openPopup(cardsAddPopup);
}

export function clearCardsPopupInfo() {
  cardsPopupForm.reset();
}

