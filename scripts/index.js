const popupEditProfile = document.querySelector(".popup_profile");
const popupsClose = document.querySelectorAll(".popup");
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

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByEsc);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByEsc);
}

initialCards.forEach((element) => {
  cardContainer.append(createCard(element));
});

function createCard(element) {
  const cardElement = cardTemplate.cloneNode(true);

  const placeForPhoto = cardElement.querySelector(".group__image");
  placeForPhoto.src = element.link;
  placeForPhoto.alt = element.name;
  cardElement.querySelector(".group__title").textContent = element.name;

  //увелечение картинки

  placeForPhoto.addEventListener("click", function () {
    imageInputCard.src = element.link;
    imageInputCard.alt = element.name;
    titleInputCard.textContent = element.name;
    openPopup(popupEditActive);
  });

  //активный лайк
  cardElement
    .querySelector(".group__btn")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("group__btn_active");
    });
  //удаление карточки
  cardElement
    .querySelector(".group__btn-remove")
    .addEventListener("click", function (evt) {
      const deleteCard = evt.target.closest(".group__item");
      deleteCard.remove();
    });

  return cardElement;
}

function addPlaceForNewCard(item) {
  const newCard = createCard(item);

  cardContainer.prepend(newCard);
}

function submitEditCardForm(evt) {
  evt.preventDefault();

  const name = cardNameEdit.value;
  const link = cardImageLinkEdit.value;
  const newCardInfo = { name, link };

  addPlaceForNewCard(newCardInfo);
  closePopup(popupEditCard);
  formEditProfile.reset();
  evt.target.reset();
  evt.submitter.classList.add("popup__save_disabled");
  evt.submitter.disabled = true;
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

function closePopupByEsc(evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
}

popupsClose.forEach(function (popup) {
  popup.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
  });
});

buttonOpenCard.addEventListener("click", function () {
  openPopup(popupEditCard);
});
