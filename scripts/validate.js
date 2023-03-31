const validationFormSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__info",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  validationFormSettings
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationFormSettings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationFormSettings.errorClass);
};

const hideInputError = (formElement, inputElement, validationFormSettings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationFormSettings.inputErrorClass);
  errorElement.classList.remove(validationFormSettings.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (
  formElement,
  inputElement,
  validationFormSettings
) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      validationFormSettings
    );
  } else {
    hideInputError(formElement, inputElement, validationFormSettings);
  }
};

const setEventListeners = (formElement, validationFormSettings) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationFormSettings.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationFormSettings.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement, validationFormSettings);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, validationFormSettings);
      toggleButtonState(inputList, buttonElement, validationFormSettings);
    });
  });
};
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const enableButton = (buttonElement, validationFormSettings) => {
  buttonElement.classList.remove(validationFormSettings.inactiveButtonClass);
  buttonElement.removeAttribute("disabled", false);
};

const disableButton = (buttonElement, validationFormSettings) => {
  buttonElement.classList.add(validationFormSettings.inactiveButtonClass);
  buttonElement.setAttribute("disabled", true);
};

const toggleButtonState = (
  inputList,
  buttonElement,
  validationFormSettings
) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, validationFormSettings);
  } else {
    enableButton(buttonElement, validationFormSettings);
  }
};

const enableValidation = (validationFormSettings) => {
  const formList = Array.from(
    document.querySelectorAll(validationFormSettings.formSelector)
  );
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    setEventListeners(formElement, validationFormSettings);
  });
};

enableValidation(validationFormSettings);
