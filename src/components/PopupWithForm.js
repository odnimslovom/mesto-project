import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popup, form, formSubmitter, formSubmitHandler) {
    super(popup);
    this._form = form;
    this._formSubmitHandler = formSubmitHandler;
    this._formSubmitter = formSubmitter;
    this._inputList = this._form.querySelectorAll('.popup__form-input');
  }

  // Сбор и установка информации инпутов
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

  // Отрисовка процесса загрузки на кнопке
  renderSubmitter(isLoad){
    this._formSubmitter.textContent = isLoad ? "Сохранение..." : "Сохранить";
  }

}
