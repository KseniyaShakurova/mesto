export default class UserInfo {
  constructor({ nameInput, aboutInput, avatar }) {
    this._nameInput = document.querySelector(nameInput);
    this._aboutInput = document.querySelector(aboutInput);
    this._avatarUser = document.querySelector(avatar);
  }
  getUserInfo() {
    const infoNew = {
      imputName: this._nameInput.textContent,
      imputAbout: this._aboutInput.textContent,
    };
    return infoNew;
  }

  setUserInfo({ inputName, inputAbout }) {
    this._nameInput.textContent = inputName;
    this._aboutInput.textContent = inputAbout;
  }

  setAvatar({ avatar }) {
    this._avatarUser.src = avatar;
    console.log({ avatar });
  }

  getUserId() {
    return this._userId;
  }

  saveUserId(userId) {
    this._userId = userId;
  }
}
