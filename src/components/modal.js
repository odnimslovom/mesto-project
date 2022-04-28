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
  profileInputList, profileButtonSubmit, profileAvatar, avatarPopup,
} from "./variables.js";
import {toggleButtonState} from "./validation";
import {sendUserData} from "./api";

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
  updateProfileEditForm(profilePopupInputName.value, profilePopupInputStatus.value);
  toggleButtonState(profileInputList, profileButtonSubmit, validationOptions);
  removePopupErrors(profilePopup);
  openPopup(profilePopup);
}

export function handleProfileAvatarEditClick() {
  openPopup(avatarPopup);
}

export function updateProfile(name, status) {
  profileName.textContent = name;
  profileStatus.textContent = status;
}

export function updateAvatar(avatarLink) {
  profileAvatar.src = avatarLink;
}

export function handleSubmitProfileForm(event) {
  event.preventDefault();
  sendUserData()
    .then((data) => {
      updateProfile(data.name, data.about);
    })
    .catch((error) => {
      console.log(`Error: ${error.message}!!!`);
    });
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

