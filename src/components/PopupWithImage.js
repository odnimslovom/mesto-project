import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._placeImage = popup.querySelector('.popup__image');
    this._placeText = popup.querySelector('.popup__text');
  }

  open(link, text) {
    super.open();
    this._placeImage.src = link;
    this._placeImage.alt = text;
    this._placeText.textContent = text;
  }
}
