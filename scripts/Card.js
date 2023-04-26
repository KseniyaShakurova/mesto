class Card {
  constructor(data, templateSelector, openImage) {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.alt;
    this._openImage = openImage;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".group__item")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._imageElement = this._element.querySelector(".group__image");
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._titleElement = this._element.querySelector(".group__title");
    this._titleElement.textContent = this._name;
    this._likeElement = this._element.querySelector(".group__btn");
    this._deleteElement = this._element.querySelector(".group__btn-remove");
    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this._deleteElement.addEventListener("click", () => {
      this._deleteCard();
    });
    this._likeElement.addEventListener("click", () => {
      this._likeActive();
    });
    this._imageElement.addEventListener("click", () => {
      this._openImage(this._link, this._name, this._alt);
    });
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _likeActive() {
    this._likeElement.classList.toggle("group__btn_active");
  }
}

export default Card;
