export default class Popup {
  constructor(popup) {
    this._popup = popup;
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._popup._closeByEsc);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._popup._closeByEsc);
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this._popup.close();
      }
      if (evt.target.classList.contains('popup__button_type_close')) {
        this._popup.close();
      }
    });
  }

  _closeByEsc(evt) {
    if (evt.key === 'Escape') {
      this._popup.close();
    }
  }


}
