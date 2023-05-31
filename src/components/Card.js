class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,

    { likeCard, dislike, deleteCard }
  ) {
    this._name = data.name;
    this._link = data.link;
    this._userId = data.userId;
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;
    this._likeCard = likeCard;
    this._dislike = dislike;
    this._deleteCard = deleteCard;
    this._likes = data.likes;
    this._id = data._id;
    this._ownerId = data.ownerId;
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
    this._likesCalculator = this._element.querySelector(
      ".group__likes-calculator"
    );
    this._likesCalculator.textContent = this._likes.length;
    this._userLikes = this._likes.some((like) => like._id === this._userId);
    this._deleteElement = this._element.querySelector(".group__btn-remove");
    this._setEventListeners();
    this._isLikes();
    this._isOwner();
    return this._element;
  }

  _setEventListeners() {
    this._deleteElement.addEventListener("click", () => {
      this._deleteCard(this._id);
    });
    this._likeElement.addEventListener("click", (evt) => {
      if (this._likeElement.classList.contains("group__btn_active")) {
        this._dislike(evt);
      } else {
        this._likeCard(evt);
      }
    });
    this._imageElement.addEventListener("click", () => {
      this._handleCardClick(this._link, this._name);
    });
  }

  _isOwner() {
    if (this._userId !== this._ownerId) {
      this._deleteElement.remove();
      this._deleteElement = null;
    }
  }

  getCardId() {
    return this._id;
  }

  _isLikes() {
    if (this._userLikes) {
      this._likeElement.classList.add("group__btn_active");
    }
  }

  deleteMyCard() {
    this._element.remove();
    this._element = null;
  }

  putLikeCard() {
    this._likeElement.classList.add("group__btn_active");
  }

  dislikeCard() {
    this._likeElement.classList.remove("group__btn_active");
  }

  countLikes(data) {
    this._likeElement.classList.toggle("group__btn_active");
    this._likesCalculator.textContent = data.likes.length;
  }
}

export default Card;
