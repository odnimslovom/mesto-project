export default class FormValidator {
  constructor(validationOptions, formElement) {
    this._validationOptions = validationOptions;
    this._formElement = formElement;
  }

  // Включение валидации форм
  enableValidation() {
      this._formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      this._formElement._setEventListeners(this._formElement, this._validationOptions);
  }

  // Установка слушателей валидации
  _setEventListeners(formElement, validationOptions) {
    const inputList = Array.from(formElement.querySelectorAll(validationOptions.inputElementClass));
    const buttonSubmit = formElement.querySelector(validationOptions.buttonElementClass);
    this._toggleButtonState(inputList, buttonSubmit, validationOptions);
    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement, validationOptions);
        this._toggleButtonState(inputList, buttonSubmit, validationOptions);
      });
    });
  }

  // Отключение кнопки при невалидных полях
  _toggleButtonState(inputList, buttonElement, validationOptions) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(validationOptions.buttonInactiveElementClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(validationOptions.buttonInactiveElementClass);
      buttonElement.disabled = false;
    }
  }

  // Валидация поля
  _checkInputValidity(formElement, inputElement, validationOptions) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage, validationOptions);
    } else {
      this._hideInputError(formElement, inputElement, validationOptions);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  }

  // Отображение ошибок при валидации
  _showInputError(formElement, inputElement, errorMessage, validationOptions) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(validationOptions.inputInvalidElementClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationOptions.errorActiveElementClass);
  }

  _hideInputError(formElement, inputElement, validationOptions) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(validationOptions.inputInvalidElementClass);
    errorElement.classList.remove(validationOptions.errorActiveElementClass);
    errorElement.textContent = '';
  }

}



