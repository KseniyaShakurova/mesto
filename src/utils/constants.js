
export const popupEditProfile = document.querySelector(".popup_profile");
export const popups = document.querySelectorAll(".popup");
const popupSave = document.querySelector(".popup__save");
export const popupEditCard = document.querySelector(".popup_card");
export const popupEditActive = document.querySelector(".popup_active");
export const buttonOpenProfile = document.querySelector(".profile__button-edit");
export const buttonOpenCard = document.querySelector(".profile__button-add");
export const buttonsClosePopup = document.querySelectorAll(".popup__btn");
export const formEditProfile = document.querySelector(".popup__form");
export const nameImput = document.querySelector(".popup__info_input_name");
export const jobInput = document.querySelector(".popup__info_input_job");
export const nameSave = document.querySelector(".profile__title");
export const jobSave = document.querySelector(".profile__subtitle");
const imageInputCard = document.querySelector(".popup__open-image");
const titleInputCard = document.querySelector(".popup__open-title");
export const cardNameEdit = document.querySelector("#popup__name-card");
export const cardImageLinkEdit = document.querySelector("#popup__link-card");
export const cardContainer = ".card";
const cardTemplate = document.querySelector(".group").content;
export const formElementCard = document.querySelector("#popup__form-card");


const kamchatka = new URL('../images/kamchatka.jpg', import.meta.url);
const altai = new URL('../images/altai.jpg', import.meta.url);
const karelia = new URL('../images/karelia.jpg', import.meta.url);
const baikal = new URL('../images/baikal.jpg', import.meta.url);
const sochi = new URL('../images/sochi.jpg', import.meta.url);
const elbrus = new URL('../images/elbrus.jpg', import.meta.url);

export const initialCards = [
  {
    name: "Kamchatka",
    link: kamchatka,
  },
  {
    name: "Altai",
    link: altai,
  },
  {
    name: "Karelia",
    link: karelia,
  },
  {
    name: "Baikal",
    link: baikal,
  },
  {
    name: "Sochi",
    link: sochi,
  },
  {
    name: "Elbrus",
    link: elbrus,
  },
];

export const validationFormSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__info",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
