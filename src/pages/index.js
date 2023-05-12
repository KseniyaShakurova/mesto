import '../pages/index.css';

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';

import { initialCards, validationFormSettings } from "../utils/constants.js";
import {
  nameImput, 
  jobInput, 
  cardContainer,
  popupEditActive,
  popupEditProfile,
  buttonOpenProfile,
  nameSave,
  jobSave,
  popupEditCard,
  buttonOpenCard,
  formElementCard,
  formEditProfile,
  
  } from '../utils/constants.js';


const addFormValidatorPopup = new FormValidator(
  validationFormSettings,
  formElementCard
);
const editFormValidatorProfile = new FormValidator(
  validationFormSettings,
  formEditProfile
);

editFormValidatorProfile.enableValidation();
addFormValidatorPopup.enableValidation();

const userInfo = new UserInfo({
  nameInput: '.profile__title',
  aboutInput: '.profile__subtitle'
});

console.log(userInfo)

function handleCardClick(link, name) {
  popupImage.open(link, name);
}

function createCard(item) {
  const newCard = new Card(item, ".group", handleCardClick);
  return newCard.generateCard();
}

const newSection = new Section ({
  items: initialCards,
  renderer: (item) => {
    newSection.addItem(createCard(item));
  }
}, 
cardContainer
);
newSection.renderItems();


const popupImage = new PopupWithImage(popupEditActive);
popupImage.setEventListeners();



const submitEditProfile = new PopupWithForm(
  popupEditProfile, 
  {submitEdit: ({
    'profile-name': inputName,
    'job': inputAbout
  }) => {
    userInfo.setUserInfo({inputName, inputAbout})
  }
})

submitEditProfile.setEventListeners()

buttonOpenProfile.addEventListener("click", () => {
  submitEditProfile.setInputValues(userInfo.getUserInfo());
  editProfileInput();
  submitEditProfile.open();
  editFormValidatorProfile.hideInputErrors();
});

function editProfileInput() {
  nameImput.value = nameSave.textContent;
  jobInput.value = jobSave.textContent;
}

const newCard = new PopupWithForm(popupEditCard, 
  {submitEdit: ({
    'popup__name-card': name,
    'popup__link-card': link,

  }) => {
    newSection.addItem(createCard({name, link}));
  }
  });
newCard.setEventListeners();


buttonOpenCard.addEventListener("click", function () {
  addFormValidatorPopup.hideInputErrors();
  newCard.open();
});







