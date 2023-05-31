import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popup) {
    super(popup);
    this._formSelector = this._popup.querySelector(".popup__form");
  }

  submitAdd(callback) {
    this._submitEdit = callback;
  }

  setEventListeners() {
    super.setEventListeners();

    this._formSelector.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitEdit();
    });
  }
}
