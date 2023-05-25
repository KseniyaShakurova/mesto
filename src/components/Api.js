export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl,
    this._headers = options.headers
  }

  _handleResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

  getUserInfo() {

    return fetch(`${this._baseUrl}/users/me`, {
        method: 'GET',
        headers: this._headers
    })
    .then(this._handleResponse)

  }

  getInitialCards() {

    return fetch(`${this._baseUrl}/cards`, { 
      method: "GET",
      headers: this._headers })
      .then(this._handleResponse)
    
  }
  

  setUserInfo({inputName, inputAbout}) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: inputName,
        about: inputAbout,
      }),
    })
    .then(this._handleResponse);
  }

  createNewCard(data)  {
    return fetch(`${this._baseUrl}/cards`,{
        method: "POST",
        headers: this._headers,
        body: JSON.stringify(data)
    })
    .then(this._handleResponse);
  }

  likes(card) {
    return fetch(`${this._baseUrl}/cards/${card._id}/likes`, {
        method: "PUT",
        headers: this._headers,
    })
    .then(this._handleResponse);
  }

  disLikes(card) {
    return fetch(`${this._baseUrl}/cards/${card._id}/likes`, {
        method: "DELETE",
        headers: this._headers,
    })
    .then(this._handleResponse);
  }

  deleteCard (id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
        method: "DELETE",
        headers: this._headers,
    })
    .then(this._handleResponse);
  }

  updateAvatar (userAvatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, { 
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
            avatar: userAvatar
            
        })
        
     })
    //.then(this._handleResponse);
    .then((res) => {
      console.log(res);
      if (res.ok) {
        //console.log(res);
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })

    .catch(() => {
      console.log("ошибка")
    })
  }
  
}




