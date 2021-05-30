export default class Api {
	constructor ({url, token}) {
		this._url = url;
		this._token = token;
	}

getUserInfo () {
	return fetch(`${this._url}/users/me`, {
    method: 'GET',
      headers: {
        authorization: this._token
      }
    })
      .then((result) => {
      if (result.ok) {
          return result.json();
        } else {
          return Promise.reject(`Ошибка: ${result.status}`)
        }
      })
}

setUserInfo ({name, about}) {
	return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name, about
      })
    })
      .then((result) => {
        if (result.ok) {
          return result.json();
        } else {
          return Promise.reject(`Ошибка: ${result.status}`)
        }
      })
}

getCards () {
	return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._token
      }
    })
      .then((result) => {
        if (result.ok) {
          return result.json();
        } else {
          return Promise.reject(`Ошибка: ${result.status}`)
        }
      })
      .then(
        data =>
          data.map(e => {
            e.isMine = e.owner._id === "a4f1ef1e0fd3a856de639ea5";
            return e;
          })
      )
}

setNewCard ({name, link}) {
	return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then((result) => {
        if (result.ok) {
          return result.json();
        } else {
          return Promise.reject(`Ошибка: ${result.status}`)
        }
      })
}

}




