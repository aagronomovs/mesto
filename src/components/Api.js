//export default class Api {
//    constructor({
//        baseUrl,
//        headers
//    }) {
//        this._baseUrl = baseUrl;
//        this._headers = headers;
//    }

//    _getResponse(res) {
//        if (res.ok) {
//            return res.json();
//        }
//        return Promise.reject(`Ошибка: ${res.status}`);
//    }

//    getUserInfo() {
 //       return fetch(`${this._baseUrl}/users/me`, {
//                method: 'GET',
//                headers: this._headers,
//            })
 //           .then(this._getResponse);
//    }

//    getCards() {
//        return fetch(`${this._baseUrl}/cards`, {
//                method: 'GET',
//                headers: this._headers,
//            })
 //           .then(this._getResponse);
//    }

//    updateUserInfo(name, about) {
//        return fetch(`${this._baseUrl}/users/me`, {
//                method: 'PATCH',
 //               headers: this._headers,
//                body: JSON.stringify({
//                    name: name,
//                    about: about,
//                }),
//            })
//            .then(this._getResponse);
//    }

//   postNewCard(name, link) {
//        return fetch(`${this._baseUrl}/cards`, {
//                method: 'POST',
//                headers: this._headers,
//                body: JSON.stringify({
//                    name: name,
//                    link: link,
//                }),
//            })
//            .then(this._getResponse);
//    }

//    deleteCard(cardId) {
//        return fetch(`${this._baseUrl}/cards/${cardId}`, {
//                method: 'DELETE',
//                headers: this._headers,
//            })
//            .then(this._getResponse);
//    }

//    updateAvatar(avatar) {
//        return fetch(`${this._baseUrl}/users/me/avatar`, {
//                method: 'PATCH',
//                headers: this._headers,
//                body: JSON.stringify({
//                    avatar: avatar,
//                }),
//            })
//            .then(this._getResponse);
//    }

//    getLikes(cardId) {
//        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
//                method: 'PUT',
//                headers: this._headers,
//            })
//            .then(this._getResponse);
//    }

//    removeLike(cardId) {
//        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
//                method: 'DELETE',
//                headers: this._headers,
//            })
//            .then(this._getResponse);
//    }
//} 