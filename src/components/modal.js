
import {
  profilePopup, profileName, profileStatus, profilePopupInputName,
  profilePopupInputStatus, cardsAddPopup, cardsPopupForm, imagePopup, errorList,
} from "./variables.js";

profilePopup.addEventListener('click', function (evt){
  if (evt.target.classList.contains('popup_opened')){
    closePopup(profilePopup);
  }
});

cardsAddPopup.addEventListener('click', function (evt){
  if (evt.target.classList.contains('popup_opened')){
    closePopup(cardsAddPopup);
  }
});


function closeByEsc(evt) {
  const openedPopup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(openedPopup);
  }
}

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
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
  removePopupErrors(profilePopup);
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
  removePopupErrors(cardsAddPopup);
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

