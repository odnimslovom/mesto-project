"use strict";
//webpack import
import "../pages/index.css";

import {handleCardAddClick, handleSubmitCardsForm} from "./cards";
import {
  avatarPopup,
  cardsPopupForm,
  profileBtnAdd,
  profileBtnAvatarEdit,
  profileBtnEdit,
  profilePopupForm,
  validationOptions,
} from "./variables.js";

import {enableValidation} from "./validation";
import {
  getUserData,
  handleProfileAvatarEditClick,
  handleProfileEditClick,
  handleSubmitAvatar,
  handleSubmitProfileForm,
} from "./profile";

profileBtnEdit.addEventListener('click', handleProfileEditClick);
profileBtnAvatarEdit.addEventListener('click', handleProfileAvatarEditClick);
profileBtnAdd.addEventListener('click', handleCardAddClick);
profilePopupForm.addEventListener('submit', handleSubmitProfileForm);
cardsPopupForm.addEventListener('submit', handleSubmitCardsForm);
avatarPopup.addEventListener('submit', handleSubmitAvatar);

getUserData();
enableValidation(validationOptions);



