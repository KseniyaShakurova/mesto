const popupEditProfile = document.querySelector(".popup_profile");
const popupEditCard = document.querySelector(".popup_card");
const popupEditActive = document.querySelector(".popup_active");
const buttonOpenProfile = document.querySelector(".profile__button-edit");
const buttonOpenCard = document.querySelector(".profile__button-add");
const buttonClosePopup = document.querySelectorAll(".popup__btn");
const formElement = document.querySelector(".popup__form");
const nameImput = document.querySelector(".popup__info_input_name");
const jobInput = document.querySelector(".popup__info_input_job");
const nameSave = document.querySelector(".profile__title");
const jobSave = document.querySelector(".profile__subtitle");
const imageInputCard = document.querySelector(".popup__open-image");
const titleInputCard = document.querySelector(".popup__open-title");
const cardNameEdit = document.querySelector("#name__card");
const cardImageLinkEdit = document.querySelector("#image__link");
const cardContainer = document.querySelector(".card");
const cardTemplate = document.querySelector(".group").content;
const formElementCard = document.querySelector("#popup__form-card");

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

initialCards.forEach((element) => {
  cardContainer.append(editCardTemplate(element));
});

function editCardTemplate(element) {
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
  const newCard = editCardTemplate(item);

  cardContainer.prepend(newCard);
}

function submitEditCardForm(evt) {
  evt.preventDefault();

  const name = cardNameEdit.value;
  const link = cardImageLinkEdit.value;
  const newCardInfo = { name, link };

  addPlaceForNewCard(newCardInfo);
  closePopup(popupEditCard);
  evt.target.reset();
}

function submitEditProfileForm(evt) {
  evt.preventDefault();

  const formName = nameImput.value;
  const formJob = jobInput.value;
  nameSave.textContent = formName;
  jobSave.textContent = formJob;

  closePopup(popupEditProfile);
}

formElement.addEventListener("submit", submitEditProfileForm);
formElementCard.addEventListener("submit", submitEditCardForm);

buttonOpenProfile.addEventListener("click", function () {
  nameImput.value = nameSave.textContent;
  jobInput.value = jobSave.textContent;
  openPopup(popupEditProfile);
});

buttonClosePopup.forEach(function (button) {
  const popups = button.closest(".popup");

  button.addEventListener("click", () => closePopup(popups));
});

buttonOpenCard.addEventListener("click", function () {
  openPopup(popupEditCard);
});
