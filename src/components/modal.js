import {popups} from "../utils/variables.js";

// Обработчики закрытия попапов
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

// Обработка открытия и закрытия попапов
export const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
};

export const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
};

const closeByEsc = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

// Обработка ошибок при переоткрытии попапа
export const removePopupErrors = (popup) => {
  const errorList = popup.querySelectorAll('.popup__form-error');
  errorList.forEach(errorItem => {
      if (popup.contains(errorItem)) {
        errorItem.classList.remove('popup__form-error_type_active');
      }
    }
  );
};

// Очистка форм попапов
export const clearPopupForm = (popupForm) => {
  popupForm.reset();
};

