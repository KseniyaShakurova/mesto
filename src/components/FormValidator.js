export default class FormValidator {
  constructor(validationFormSettings, formElement) {
    this._inputSelector = validationFormSettings.inputSelector;
    this._submitButtonSelector = validationFormSettings.submitButtonSelector;
    this._inactiveButtonClass = validationFormSettings.inactiveButtonClass;
    this._inputErrorClass = validationFormSettings.inputErrorClass;
    this._formSelector = validationFormSettings.formSelector;
    this._errorClass = validationFormSettings.errorClass;

    this._formElement = formElement;
    this._formInputs = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._formButton = this._formElement.querySelector(
      this._submitButtonSelector
    );
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  hideInputErrors = () => {
    this._formInputs.forEach((input) => {
      this._hideInputError(input);
    })
  }

  _hasInvalidInput() {
    return this._formInputs.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _enableButton() {
    this._formButton.classList.remove(this._inactiveButtonClass);
    this._formButton.removeAttribute("disabled", false);
  }

  disableButton() {
    this._formButton.classList.add(this._inactiveButtonClass);
    this._formButton.setAttribute("disabled", true);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableButton();
    } else {
      this._enableButton();
    }
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners() {
    this._toggleButtonState();

    this._formInputs.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
