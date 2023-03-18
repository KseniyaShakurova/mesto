const popupProfile = document.querySelector('.popup_profile');
const popupCard = document.querySelector('.popup_card');
const popupActive = document.querySelector('.popup_active');
const buttonPen = document.querySelector('.profile__button-edit');
const buttonPlus = document.querySelector('.profile__button-add');
const buttonClosePen = document.querySelector('#popup__close-profile');
const buttonClosePlus = document.querySelector('#popup__close-card');
const formElement = document.querySelector('.popup__form');
const nameImput = document.querySelector('.popup__info_input_name');
const jobInput = document.querySelector('.popup__info_input_job');
const nameSave = document.querySelector('.profile__title');
const jobSave = document.querySelector('.profile__subtitle');
const popupImage = document.querySelector('#popup__close-image');
const popupContainerOpen = document.querySelector('.popup__container-open');
const popupImageCard = document.querySelector('.popup__open-image');
const popupTitleCard = document.querySelector('.popup__open-title');
const nameCard = document.querySelector('#name__card');
const imageLink = document.querySelector('#image__link');

const savePopupCard = document.querySelector('#popup__save-card');

function btnOpen(popup) {
  popup.classList.add('popup_opened');
}

function btnClose(popup) {   
  popup.classList.remove('popup_opened');
}

//подслушка кнопок
buttonPen.addEventListener('click', function() {
  nameImput.value = nameSave.textContent;
  jobInput.value = jobSave.textContent;
  btnOpen(popupProfile);
});

buttonClosePen.addEventListener ('click', function() {
btnClose(popupProfile);
});

 popupImage.addEventListener ('click', function() {
  btnClose(popup);
})

buttonPlus.addEventListener('click', function() {
    btnOpen(popupCard);
});

buttonClosePlus.addEventListener('click', function() {
  btnClose(popupCard);
});

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

  const cardContainer = document.querySelector('.card');
  const cardTemplate = document.querySelector('.group').content;
  const popupCardForm = document.querySelector('#popup__form-card');
  
  initialCards.forEach((element) => {
    cardContainer.append(сreationCard(element));

    });

  function сreationCard(element) {

    const cardElement = cardTemplate.cloneNode(true);
   

    cardElement.querySelector('.group__image').src = element.link;
    cardElement.querySelector('.group__title').textContent = element.name;
    cardElement.querySelector('.group__image').alt = element.name;

    //увелечение картинки 
  cardElement.querySelector('.group__image').addEventListener('click', function() {
      popupImageCard.src = element.link;
      popupImageCard.alt = element.name;
      popupTitleCard.textContent = element.name;
      btnOpen(popupActive);
    });
  

    //активный лайк
  cardElement.querySelector('.group__btn').addEventListener('click', function(evt) {
      evt.target.classList.toggle('group__btn_active');
      });
    //удаление карточки
  cardElement.querySelector('.group__btn-remove').addEventListener('click', function(evt) {
      const deleteCard = evt.target.closest('.group__item');
      deleteCard.remove();
    });
   
   
    return cardElement;
  };

  
  
function saveCardImg(item) {

  const newCard = сreationCard(item);

  cardContainer.prepend(newCard);
};



  
function handleCardForm(evt) {
    evt.preventDefault();

  
  const name = nameCard.value;
  const link = imageLink.value;
  const cardInfo = { name, link };

  saveCardImg(cardInfo);
  btnClose(popupCard);
  evt.target.reset();
  };

 
 
function handleFormSubmit (evt) {
    evt.preventDefault(); 

    nameImput.textContent = nameSave.value;
    jobInput.textContent = jobSave.value;
    const formName = nameImput.value;
    const formJob = jobInput.value;
    nameSave.textContent = formName;
    jobSave.textContent = formJob;
    
     btnClose(popupProfile);
    
}

formElement.addEventListener('submit', handleFormSubmit);
popupCardForm.addEventListener('submit', handleCardForm);






