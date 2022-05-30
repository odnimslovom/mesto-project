//webpack import
import "./index.css";

import {handleCardAddClick, handleSubmitCardsForm} from "../components/cards";
import {
  apiConfig,
  avatarPopup,
  cardsPopupForm,
  profileBtnAdd,
  profileBtnAvatarEdit,
  profileBtnEdit,
  profilePopupForm,
  validationOptions,
} from "../utils/variables.js";

import {
  getUserData,
  handleProfileAvatarEditClick,
  handleProfileEditClick,
  handleSubmitAvatar,
  handleSubmitProfileForm,
} from "../components/profile";



const API = new API(apiConfig);
const FormValidator = new FormValidator(validationOptions);



// getUserData();
// enableValidation(validationOptions);


// profileBtnEdit.addEventListener('click', handleProfileEditClick);
// profileBtnAvatarEdit.addEventListener('click', handleProfileAvatarEditClick);
// profileBtnAdd.addEventListener('click', handleCardAddClick);
// profilePopupForm.addEventListener('submit', handleSubmitProfileForm);
// cardsPopupForm.addEventListener('submit', handleSubmitCardsForm);
// avatarPopup.addEventListener('submit', handleSubmitAvatar);
