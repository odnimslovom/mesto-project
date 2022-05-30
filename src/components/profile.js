import {requestUserData, sendAvatarData, sendUserData} from "./API";
import {clearPopupForm, closePopup, openPopup, removePopupErrors} from "./modal";
import {renderStartCards} from "./cards";
import {
  avatarButtonSubmit,
  avatarPopup,
  avatarPopupInputLink,
  avatarPopupForm,
  profileAvatar,
  profileButtonSubmit,
  profileInputList,
  profileName,
  profilePopup,
  profilePopupInputName,
  profilePopupInputStatus,
  profileStatus,
  validationOptions
} from "../utils/variables";
import {toggleButtonState} from "./FormValidator";

// Первоначальная загрузка данных с сервера
export const getUserData = () => {
  requestUserData()
    .then((data) => {
      let userId = data._id;
      updateProfile(data.name, data.about);
      updateAvatar(data.avatar);
      renderStartCards(userId);
    }).catch((error) => console.log(`Error: ${error.message}!!!`));
};

// Работа с аватаром
export const handleProfileAvatarEditClick = () => {
  toggleButtonState([avatarPopupInputLink], avatarButtonSubmit, validationOptions);
  removePopupErrors(avatarPopup);
  openPopup(avatarPopup);
};

export const handleSubmitAvatar = (event) => {
  event.preventDefault();
  avatarButtonSubmit.textContent = 'Сохранение...';
  sendAvatarData(avatarPopupInputLink.value).then((res) => {
    updateAvatar(res.avatar);
    closePopup(avatarPopup);
  }).catch((error) => {
    console.log(`Error: ${error.message}!!!`);
  }).finally(() => {
    avatarButtonSubmit.textContent = 'Сохранить';
    clearPopupForm(avatarPopupForm);
  });
};

const updateAvatar = (avatarLink) => {
  profileAvatar.src = avatarLink;
};

// Работа с профилем
export const handleProfileEditClick = () => {
  updateProfileEditForm(profilePopupInputName.value, profilePopupInputStatus.value);
  toggleButtonState(profileInputList, profileButtonSubmit, validationOptions);
  removePopupErrors(profilePopup);
  openPopup(profilePopup);
};

export const handleSubmitProfileForm = (event) => {
  event.preventDefault();
  profileButtonSubmit.textContent = 'Сохранение...';
  sendUserData(profilePopupInputName.value, profilePopupInputStatus.value)
    .then((data) => {
      updateProfile(data.name, data.about);
      closePopup(profilePopup);
    })
    .catch((error) => {
      console.log(`Error: ${error.message}!!!`);
    }).finally(() => {
    profileButtonSubmit.textContent = 'Сохранить';
  });
};

const updateProfileEditForm = () => {
  profilePopupInputName.value = profileName.textContent;
  profilePopupInputStatus.value = profileStatus.textContent;
};

const updateProfile = (name, status) => {
  profileName.textContent = name;
  profileStatus.textContent = status;
};

