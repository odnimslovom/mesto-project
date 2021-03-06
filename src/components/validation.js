// Включение валидации форм
export const enableValidation = (validationOptions) => {
  const formList = Array.from(document.querySelectorAll(validationOptions.formElementClass));
  formList.forEach(formElement => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, validationOptions);
  });
};

// Отключение кнопки при невалидных полях
export const toggleButtonState = (inputList, buttonElement, validationOptions) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationOptions.buttonInactiveElementClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(validationOptions.buttonInactiveElementClass);
    buttonElement.disabled = false;
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  });
};

// Установка слушателей валидации
const setEventListeners = (formElement, validationOptions) => {
  const inputListCards = Array.from(formElement.querySelectorAll(validationOptions.inputElementClass));
  const buttonSubmitCard = formElement.querySelector(validationOptions.buttonElementClass);
  toggleButtonState(inputListCards, buttonSubmitCard, validationOptions);
  inputListCards.forEach(inputElement => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, validationOptions);
      toggleButtonState(inputListCards, buttonSubmitCard, validationOptions);
    });
  });
};

// Валидация поля
const checkInputValidity = (formElement, inputElement, validationOptions) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationOptions);
  } else {
    hideInputError(formElement, inputElement, validationOptions);
  }
};

// Отображение ошибок при валидации
const showInputError = (formElement, inputElement, errorMessage, validationOptions) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(validationOptions.inputInvalidElementClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationOptions.errorActiveElementClass);
};

const hideInputError = (formElement, inputElement, validationOptions) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(validationOptions.inputInvalidElementClass);
  errorElement.classList.remove(validationOptions.errorActiveElementClass);
  errorElement.textContent = '';
};
