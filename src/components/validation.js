export function enableValidation(validationOptions) {
  const formList = Array.from(document.querySelectorAll(validationOptions.formElementClass));
  formList.forEach(formElement => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, validationOptions);
  });
}

function setEventListeners(formElement, validationOptions) {
  const inputList = Array.from(formElement.querySelectorAll(validationOptions.inputElementClass));
  const buttonElement = formElement.querySelector(validationOptions.buttonElementClass);
  toggleButtonState(inputList, buttonElement, validationOptions);

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, validationOptions);
      toggleButtonState(inputList, buttonElement, validationOptions);
    });
  });
}

function toggleButtonState(inputList, buttonElement, validationOptions) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationOptions.buttonInactiveElementClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(validationOptions.buttonInactiveElementClass);
    buttonElement.disabled = false;
  }
}

function hasInvalidInput(inputList) {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  });
}

function checkInputValidity(formElement, inputElement, validationOptions) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationOptions);
  } else {
    hideInputError(formElement, inputElement, validationOptions);
  }
}

function showInputError(formElement, inputElement, errorMessage, validationOptions) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(validationOptions.inputInvalidElementClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationOptions.errorActiveElementClass);
}

function hideInputError(formElement, inputElement, validationOptions) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(validationOptions.inputInvalidElementClass);
  errorElement.classList.remove(validationOptions.errorActiveElementClass);
  errorElement.textContent = '';
}
