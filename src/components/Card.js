export default class Card {

  constructor(cardTemplateSelector, cardData, userId, api, cardClickHandler) {
    this._cardTemplate = cardTemplateSelector;
    this._cardName = cardData.name;
    this._cardLink = cardData.link;
    this._likes = cardData.likes;
    this._cardId = cardData._id;
    this._cardOwner = cardData.owner._id;
    this._userId = userId;
    this._api = api;
    this._cardClickHandler = cardClickHandler;
  }

  _getCardElement() {
    return this._cardTemplate
      .content
      .querySelector('.cards__item')
      .cloneNode(true);
  }

  generateCard() {
    this._cardElement = this._getCardElement();

    this._cardImage = this._cardElement.querySelector('.cards__image');
    this._cardTitle = this._cardElement.querySelector('.cards__title');
    this._cardDelete = this._cardElement.querySelector('.cards__delete');
    this._cardLike = this._cardElement.querySelector('.cards__like');
    this._cardLikesCounter = this._cardElement.querySelector('.cards__like-counter');

    this._cardImage.src = this._cardLink;
    this._cardImage.alt = this._cardName;
    this._cardTitle.textContent = this._cardName;
    this._cardLikesCounter.textContent = isNaN(this._likes.length) ? 0 : this._likes.length;
    if (this._cardOwner !== this._userId) {
      this._cardDelete.remove();
    }
    if (this._likes.find(item => item._id === this._userId) !== undefined) {
      this._cardLike.classList.add('.card__likes-active');
    }

    this._setEventListeners();

    return this._cardElement;
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => this._cardClickHandler(this._cardName, this._cardLink));
    this._cardLike.addEventListener('click', () => this._toggleLike());
    this._cardDelete.addEventListener('click', () => this._deleteCard());
  }

  _toggleLike() {
    if (this._cardLike.classList.contains('cards__like_active')) {
      this._api.deleteLikeData(this._cardId)
        .then((res) => {
          this._cardLikesCounter.textContent = res.likes.length;
          this._cardLike.classList.remove('cards__like_active');
        })
        .catch((error) => console.log(`Error: ${error.message}!!!`));
    } else {
      this._api.sendLikeData(this._cardId)
        .then((res) => {
          this._cardLikesCounter.textContent = res.likes.length;
          this._cardLike.classList.add('cards__like_active');
        })
        .catch((error) => console.log(`Error: ${error.message}!!!`));
    }
  }

  _deleteCard() {
    this._api.deleteCardData(this._cardId)
      .then(this._cardElement.remove());
  }

}
