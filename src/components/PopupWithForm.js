import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popup, {submitEdit}) {
        super(popup);
        this._submitEdit = submitEdit;
        this._inputSelector = Array.from(this._popup.querySelectorAll('.popup__info'));
        this._formSelector = this._popup.querySelector('.popup__form');
        console.log(this)
    }

    _getInputValues() {
        this._formValues = {};
        this._inputSelector.forEach(input => {
          return  this._formValues[input.id] = input.value;
          });

          return this._formValues;
    }

     setInputValues(data) {
        this._inputSelector.forEach((item) => {
            item.value = data[item.name];
        })
     }


    setEventListeners() {
        super.setEventListeners();
        
        this._formSelector.addEventListener('submit', (evt) => {
            evt.preventDefault();
        
            
            this._submitEdit(this._getInputValues());
            this.close();
    })
}
     
    close() {
        super.close();
        this._formSelector.reset();
    }


}