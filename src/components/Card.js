class Card {
  constructor(data, templateSelector, handleCardClick, {like, dislike, deleteCard} ) {
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;
    this._like = like;
    this._dislike = dislike;
    this._deleteCard = deleteCard;
    this._userId = data.id;
    this._likes = data.likes;
    this._id = data._id;
    this._ownerId = data.ownerId;
    //console.log(this._ownerId)
    
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
    this._likesCalculator = this._element.querySelector(".group__likes-calculator");
    this._likesCalculator.textContent = this._likes.length;
    this._deleteElement = this._element.querySelector(".group__btn-remove");
    this._setEventListeners();
    this._isLikes();
    this._isOwner();
    this._likeActive();
    return this._element;
    
  }
  
  _setEventListeners() {
    this._deleteElement.addEventListener("click", () => {
      this.deleteCard(this._id);
    });
    this._likeElement.addEventListener("click", () => {
      this._likeActive(); 
    });
    this._imageElement.addEventListener("click", () => {
      this._handleCardClick(this._link, this._name);
    });
  }

 _isOwner() {
    
  if (this._userId !== this._ownerId) {
    //this._deleteElement.remove();
    this._deleteElement = null;
    console.log(this._userId === this._ownerId)
    console.log(this._userId)
    console.log(this._ownerId)
    }
  }

  getCardId() {
    return this._id;
  }


  

  _isLikes() {
    this._likes.forEach((user) => {
      if (user._id === this._userId) {
        this.like();
      } else {
        this.dislike();
      }
    });
  }
  

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  likeCard() {
    this._likeElement.classList.add("group__btn_active");
  }

  dislike() {
    this._likeElement.classList.remove("group__btn_active");
  }

  _likeActive() {
    if (this._likeElement.classList.contains("group__btn_active")) {
      this._like();
    } else {
      this._dislike();
    }
  }

  countLikes(data) {
    this._likesCalculator.textContent = data.likes.length;
    this._likeElement.classList.toggle("group__btn_active")
    
  }

  
}

export default Card;


