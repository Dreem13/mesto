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

updateAvatar(avatar) {
  return fetch(`${this._url}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: this._token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ avatar: avatar })
  })
  .then((result) => {
    if (result.ok) {
      return result.json();
    } else {
      return Promise.reject(`Ошибка: ${result.status}`)
    }
  })
}

deleteCard (cardId) {
  return fetch(`${this._url}/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: this._token,
      'Content-Type': 'application/json'
    },
    })
  .then((result) => {
    if (result.ok) {
      return result.json();
    } else {
      return Promise.reject(`Ошибка: ${result.status}`)
    }
  })
}

addLike (cardId) {
  return fetch(`${this._url}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: this._token,
      'Content-Type': 'application/json'
    },
    })
  .then((result) => {
    if (result.ok) {
      return result.json();
    } else {
      return Promise.reject(`Ошибка: ${result.status}`)
    }
  })
}

removeLike (cardId) {
  return fetch(`${this._url}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: this._token,
      'Content-Type': 'application/json'
    },
    })
  .then((result) => {
    if (result.ok) {
      return result.json();
    } else {
      return Promise.reject(`Ошибка: ${result.status}`)
    }
  })
}

like (cardId, isLiked) {
  return isLiked ? this.removeLike(cardId) : this.addLike(cardId);
}

}




