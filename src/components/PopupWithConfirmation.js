import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor(popup, handleSubmit) {
        super(popup);
        this._handleSubmit = handleSubmit;
        this._formSelector = this._popup.querySelector('.popup__form');
    }

    open(card) {
        this._card = card;
        super.open();
    }

    setEventListeners() {
        super.setEventListeners();
        this._formSelector.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._handleSubmit(this._card);
        });
    }
}
