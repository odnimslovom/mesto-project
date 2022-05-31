export default class Popup {
  constructor(popup) {
    this._popup = popup;
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._closeByEsc.bind(this));
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._closeByEsc.bind(this));
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      }
      if (evt.target.classList.contains('popup__button_type_close')) {
        this.close();
      }
    });
  }

  _closeByEsc(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
}
