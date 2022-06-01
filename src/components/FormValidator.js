export default class FormValidator {
  constructor(validationOptions, formElement) {
    this._validationOptions = validationOptions;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._validationOptions.inputElementClass));
    this._submitButton = this._formElement.querySelector(this._validationOptions.buttonElementClass);
  }

  // Включение валидации форм
  enableValidation() {
    this._formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  // Отключение кнопки при невалидных полях
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._validationOptions.buttonInactiveElementClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._validationOptions.buttonInactiveElementClass);
      this._submitButton.disabled = false;
    }
  }

  // Валидация поля
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  }

  // Отображение ошибок при валидации
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._validationOptions.inputInvalidElementClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._validationOptions.errorActiveElementClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._validationOptions.inputInvalidElementClass);
    errorElement.classList.remove(this._validationOptions.errorActiveElementClass);
    errorElement.textContent = '';
  }

  //Сброс ошибок невалидной формы
  resetFormErrors() {
    this._toggleButtonState();
    this._inputList.forEach(inputElement => {
      this._hideInputError(inputElement);
    });
  }

}



