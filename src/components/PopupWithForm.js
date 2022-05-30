import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popup, form, formSubmitHandler) {
    super(popup);
    this._form = form;
    this._formSubmitHandler = formSubmitHandler;
    this._inputList = this._form.querySelectorAll('.popup__form-input');
  }

  _getFormData() {
    const formData = {};
    this._inputList.forEach(input => {
      formData[input.id] = input.value;
    });
    return formData;
  }

  setFormData(formData) {
    this._inputList.forEach(input => {
      input.value = formData[input.id];
    });
  }

  resetFormData() {
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmitHandler(this._getFormData());
    });
  }

  resetFormErrors(){
    const errorList = this._form.querySelectorAll('.popup__form-error');
    errorList.forEach(errorItem => {
        if (this._form.contains(errorItem)) {
          errorItem.classList.remove('popup__form-error_type_active');
        }
      }
    );
  }

}
