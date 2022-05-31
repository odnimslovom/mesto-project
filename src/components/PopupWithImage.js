import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._placeImage = popup.querySelector('.popup__image');
    this._placeText = popup.querySelector('.popup__text');
  }

  open(cardName, cardLink) {
    super.open();
    this._placeImage.src = cardLink;
    this._placeImage.alt = cardName;
    this._placeText.textContent = cardName;
  }
}
