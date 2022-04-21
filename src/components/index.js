"use strict";
//webpack import
import "../pages/index.css";
import {renderStartCards, handleSubmitCardsForm} from "./cards.js";
import {
  profileBtnEdit, profileBtnAdd, profilePopupForm, cardsPopupForm, validationOptions,
} from "./variables.js";
import {
  handleProfileAddClick, handleProfileEditClick, handleSubmitProfileForm,
} from "./modal.js";
import {enableValidation} from "./validation";

profileBtnEdit.addEventListener('click', handleProfileEditClick);
profileBtnAdd.addEventListener('click', handleProfileAddClick);
profilePopupForm.addEventListener('submit', handleSubmitProfileForm);
cardsPopupForm.addEventListener('submit', handleSubmitCardsForm);


renderStartCards();
enableValidation(validationOptions);

