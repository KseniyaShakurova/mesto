import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor (popup) {
        super(popup);
        this._imageInputCard = this._popup.querySelector(".popup__open-image");
        this._titleInputCard = this._popup.querySelector(".popup__open-title");
    }

    open(link, name) {
        super.open();
        this._imageInputCard.src = link;
        this._imageInputCard.alt = name;
        this._titleInputCard.textContent = name;
    }
}

