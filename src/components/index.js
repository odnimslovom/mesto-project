"use strict";
//webpack import
import "../pages/index.css";

import {renderStartCards, handleSubmitCardsForm} from "./cards.js";
import {
  profileBtnEdit, profileBtnAdd, profilePopupForm, cardsPopupForm, validationOptions, profileBtnAvatarEdit, avatarPopup,
} from "./variables.js";
import {
  handleProfileAddClick,
  handleProfileEditClick,
  handleSubmitProfileForm,
  handleProfileAvatarEditClick,
  handleSubmitAvatar
} from "./modal.js";
import {enableValidation} from "./validation";
import {getUserData} from "./profile";

profileBtnEdit.addEventListener('click', handleProfileEditClick);
profileBtnAvatarEdit.addEventListener('click', handleProfileAvatarEditClick);
profileBtnAdd.addEventListener('click', handleProfileAddClick);
profilePopupForm.addEventListener('submit', handleSubmitProfileForm);
cardsPopupForm.addEventListener('submit', handleSubmitCardsForm);
avatarPopup.addEventListener('submit', handleSubmitAvatar);

getUserData();
enableValidation(validationOptions);



