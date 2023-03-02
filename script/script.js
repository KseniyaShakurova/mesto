let popup = document.querySelector('.popup')
let buttonOpen = document.querySelector('.profile__button-edit');
let buttonClose = document.querySelector('.popup__btn');
let formElement = document.querySelector('.popup__container');
let nameImput = document.querySelector('.popup__name')
let jobInput = document.querySelector('.popup__job');
let buttonSave = document.querySelector('.popup__save');
let nameSave = document.querySelector('.profile__title');
let jobSave = document.querySelector('.profile__subtitle');

buttonOpen.addEventListener ('click', function() {
    popup.classList.add('popup_opened');
    
})

function btnClose() {   
    popup.classList.remove('popup_opened');
    
}


function handleFormSubmit (evt) {
    evt.preventDefault(); 

     nameImput.innerText = nameSave.value;
     jobInput.innerText = jobSave.value;
     let formName = nameImput.value;
     let formJob = jobInput.value;
     nameSave.textContent = formName;
     jobSave.textContent = formJob;
    
     btnClose();
}

formElement.addEventListener('submit', handleFormSubmit);
buttonClose.addEventListener ('click', btnClose);



