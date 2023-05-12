export default class UserInfo {
    constructor({nameInput, aboutInput}) {
        this._nameInput= document.querySelector(nameInput);
        this._aboutInput = document.querySelector(aboutInput);
    }
    getUserInfo () {
        const infoNew = {
            imputName: this._nameInput.textContent,
            imputAbout: this._aboutInput.textContent
        }
        return infoNew;
    }

    setUserInfo({inputName, inputAbout}) {
        this._nameInput.textContent = inputName;
        this._aboutInput.textContent = inputAbout;
    }
}