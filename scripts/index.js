import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

import { initialCards, validationFormSettings } from "./constants.js";

const popupEditProfile = document.querySelector(".popup_profile");
const popups = document.querySelectorAll(".popup");
const popupSave = document.querySelector(".popup__save");
const popupEditCard = document.querySelector(".popup_card");
const popupEditActive = document.querySelector(".popup_active");
const buttonOpenProfile = document.querySelector(".profile__button-edit");
const buttonOpenCard = document.querySelector(".profile__button-add");
const buttonsClosePopup = document.querySelectorAll(".popup__btn");
const formEditProfile = document.querySelector(".popup__form");
const nameImput = document.querySelector(".popup__info_input_name");
const jobInput = document.querySelector(".popup__info_input_job");
const nameSave = document.querySelector(".profile__title");
const jobSave = document.querySelector(".profile__subtitle");
const imageInputCard = document.querySelector(".popup__open-image");
const titleInputCard = document.querySelector(".popup__open-title");
const cardNameEdit = document.querySelector("#popup__name-card");
const cardImageLinkEdit = document.querySelector("#popup__link-card");
const cardContainer = document.querySelector(".card");
const cardTemplate = document.querySelector(".group").content;
const formElementCard = document.querySelector("#popup__form-card");

const addFormValidatorPopup = new FormValidator(
  validationFormSettings,
  formElementCard
);
const editFormValidatorProfile = new FormValidator(
  validationFormSettings,
  formEditProfile
);

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByEsc);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByEsc);
}

function closePopupByEsc(evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
}

popups.forEach(function (popup) {
  popup.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
  });
});

function createCard(item) {
  const newCard = new Card(item, ".group", openImage);
  return newCard.generateCard();
}

function addPlaceForNewCard(item, templateSelector) {
  cardContainer.prepend(createCard(item, templateSelector));
}

initialCards.forEach(function (item) {
  addPlaceForNewCard(item, ".group");
});

function submitEditCardForm(evt) {
  evt.preventDefault();

  const name = cardNameEdit.value;
  const link = cardImageLinkEdit.value;
  const newCardInfo = { name, link };

  addPlaceForNewCard(newCardInfo, ".group");
  closePopup(popupEditCard);
  evt.target.reset();
  addFormValidatorPopup.disableButton();
}

function openImage(link, name) {
  imageInputCard.src = link;
  imageInputCard.alt = name;
  titleInputCard.textContent = name;
  openPopup(popupEditActive);
}

function submitEditProfileForm(evt) {
  evt.preventDefault();

  const formName = nameImput.value;
  const formJob = jobInput.value;
  nameSave.textContent = formName;
  jobSave.textContent = formJob;

  closePopup(popupEditProfile);
}

formEditProfile.addEventListener("submit", submitEditProfileForm);
formElementCard.addEventListener("submit", submitEditCardForm);

buttonOpenProfile.addEventListener("click", function () {
  nameImput.value = nameSave.textContent;
  jobInput.value = jobSave.textContent;
  openPopup(popupEditProfile);
});

buttonsClosePopup.forEach(function (button) {
  const popup = button.closest(".popup");

  button.addEventListener("click", () => closePopup(popup));
});

buttonOpenCard.addEventListener("click", function () {
  openPopup(popupEditCard);
});

editFormValidatorProfile.enableValidation();
addFormValidatorPopup.enableValidation();
