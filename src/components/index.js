"use strict";
import "../pages/index.css";
import {renderStartCards, handleSubmitCardsForm} from "./cards.js";
import {
  profileBtnEdit, profileBtnAdd, cardsPopupBtnClose, profilePopupBtnClose,
  profilePopupForm, cardsPopupForm, imagePopupBtnClose,
} from "./variables.js";

import {
  handleCardsPopupClose, handleProfileAddClick, handleProfileEditClick, handleSubmitProfileForm,
  handleProfilePopupCloseClick, handleImagePopupClose
} from "./modal.js";

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


