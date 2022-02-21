"use strict";

// page
const profile = document.querySelector('.profile');
const profileBtnEdit = profile.querySelector('.profile__button_type_edit');
const profileName = profile.querySelector('.profile__name');
const profileStatus = profile.querySelector('.profile__status');

// profile popup
const profilePopup = document.querySelector('.popup__edit-profile');
const profilePopupBtnClose = profilePopup.querySelector('.popup__button_type_close');
const profilePopupForm = profilePopup.querySelector('.popup__form');
const profilePopupInputName = profilePopupForm.querySelector('#name');
const profilePopupInputStatus = profilePopupForm.querySelector('#status');


profileBtnEdit.addEventListener('click', function(){
  updateProfileEditForm();
  openPopup(profilePopup);
});

profilePopupBtnClose.addEventListener('click', function(){
  closePopup(profilePopup);
});

profilePopupForm.addEventListener('submit', submitFormHandler);

function renderCards(){
  console.log("render cards");
}

function submitFormHandler(event){
  event.preventDefault();
  updateProfileInfo();
  closePopup(profilePopup);
}

function updateProfileInfo(){
  profileName.textContent = profilePopupInputName.value;
  profileStatus.textContent = profilePopupInputStatus.value;
}

function updateProfileEditForm(){
  profilePopupInputName.value = profileName.textContent;
  profilePopupInputStatus.value = profileStatus.textContent;
}

function openPopup(popup){
  popup.classList.add('popup_opened');
}

function closePopup(popup){
  popup.classList.remove('popup_opened');
}


