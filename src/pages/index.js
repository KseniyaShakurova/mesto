import "../pages/index.css";

import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";

import { validationFormSettings } from "../utils/constants.js";
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
  popupCardDelete,
  formAvatar,
  popupAvatar,
  buttonOpenProfileAvatar,
} from "../utils/constants.js";

let userId = null;

const addFormValidatorPopup = new FormValidator(
  validationFormSettings,
  formElementCard
);
const editFormValidatorProfile = new FormValidator(
  validationFormSettings,
  formEditProfile
);

const avatarFormValidator = new FormValidator(
  validationFormSettings,
  formAvatar
);

editFormValidatorProfile.enableValidation();
addFormValidatorPopup.enableValidation();
avatarFormValidator.enableValidation();

const userInfo = new UserInfo({
  nameInput: ".profile__title",
  aboutInput: ".profile__subtitle",
  avatar: ".profile__image",
});

const popupNewAvatar = new PopupWithForm(popupAvatar, {
  submitEdit: ({ "popup__avatar-card": userAvatar }) => {
    popupNewAvatar.loadingMessage(true, "Сохранение...");
    api
      .updateAvatar(userAvatar)
      .then(({ avatar }) => {
        userInfo.setAvatar({
          avatar: avatar,
        });
        popupNewAvatar.close();
      })

      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupNewAvatar.loadingMessage(false);
      });
  },
});

popupNewAvatar.setEventListeners();

buttonOpenProfileAvatar.addEventListener("click", () => {
  popupNewAvatar.open();
  avatarFormValidator.hideInputErrors();
});

function handleCardClick(link, name) {
  popupImage.open(link, name);
}

function createCard(data) {
  const newCard = new Card(
    {
      name: data.name,
      link: data.link,
      likes: data.likes,
      userId: userInfo.getUserId(),
      ownerId: data.owner._id,
      _id: data._id,
    },
    ".group",
    handleCardClick,

    {
      deleteCard: (cardId) => {
        popupConfirm.open();
        popupConfirm.submitAdd(function () {
          api
            .deleteCard(cardId)
            .then(() => {
              newCard.deleteMyCard();
              popupConfirm.close();
            })
            .catch((err) => console.log(err));
        });
      },
      likeCard: () => {
        api
          .likeCard(data)
          .then((data) => {
            newCard.countLikes(data);
            newCard.putLikeCard();
          })
          .catch((err) => {
            console.log(err);
          });
      },

      dislike: () => {
        api
          .disLike(data)
          .then((data) => {
            newCard.countLikes(data);
            newCard.dislikeCard();
          })
          .catch((err) => {
            console.log(err);
          });
      },
    }
  );
  return newCard.generateCard();
}

const newSection = new Section(
  {
    renderer: (item) => {
      newSection.addItemToBeginning(createCard(item));
    },
  },
  cardContainer
);

const popupImage = new PopupWithImage(popupEditActive);
popupImage.setEventListeners();

const popupConfirm = new PopupWithConfirmation(popupCardDelete);

popupConfirm.setEventListeners();
console.log(popupConfirm);

const submitEditProfile = new PopupWithForm(popupEditProfile, {
  submitEdit: ({ "profile-name": inputName, job: inputAbout }) => {
    submitEditProfile.loadingMessage(true, "Сохранение...");
    api
      .setUserInfo({ inputName, inputAbout })
      .then(({ name, about }) => {
        userInfo.setUserInfo({
          inputName: name,
          inputAbout: about,
        });
        submitEditProfile.close();
      })
      .catch((err) => {
        console.log(err);
      })

      .finally(() => {
        submitEditProfile.loadingMessage(false);
      });
  },
});
submitEditProfile.setEventListeners();

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

const popupWithForm = new PopupWithForm(popupEditCard, {
  submitEdit: ({ "popup__name-card": name, "popup__link-card": link }) => {
    popupWithForm.loadingMessage(true, "Создать");
    api
      .createNewCard({ name, link })
      .then((res) => {
        newSection.addItem(createCard(res, userId));
        popupWithForm.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupWithForm.loadingMessage(false);
      });
  },
});
popupWithForm.setEventListeners();

buttonOpenCard.addEventListener("click", function () {
  addFormValidatorPopup.hideInputErrors();
  popupWithForm.open();
});

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-66",
  headers: {
    authorization: "aa98c8c5-50a3-4af7-9387-defe134c3e66",
    "Content-Type": "application/json",
  },
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([data, items]) => {
    userInfo.saveUserId(data._id);
    console.log(userInfo);
    userInfo.setUserInfo({
      inputName: data.name,
      inputAbout: data.about,
    });
    userInfo.setAvatar({
      avatar: data.avatar,
    });
    newSection.renderItems(items);
  })

  .catch((err) => console.log(err));
