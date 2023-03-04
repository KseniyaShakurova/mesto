let popup = document.querySelector('.popup')
let buttonOpen = document.querySelector('.profile__button-edit');
let buttonClose = document.querySelector('.popup__btn');
let formElement = document.querySelector('.popup__container');
let nameImput = document.querySelector('.popup__info_input_name')
let jobInput = document.querySelector('.popup__info_input_job');
let nameSave = document.querySelector('.profile__title');
let jobSave = document.querySelector('.profile__subtitle');

function btnOpen() {
    popup.classList.add('popup_opened');
    
    nameImput.textContent = nameSave.value;
    jobInput.textContent = jobSave.value;
    
}

function btnClose() {   
    popup.classList.remove('popup_opened');
    
}


function handleFormSubmit (evt) {
    evt.preventDefault(); 

     let formName = nameImput.value;
     let formJob = jobInput.value;
     nameSave.textContent = formName;
     jobSave.textContent = formJob;
    
     btnClose();
     
}

formElement.addEventListener('submit', handleFormSubmit);
buttonClose.addEventListener ('click', btnClose);
buttonOpen.addEventListener ('click' , btnOpen);



