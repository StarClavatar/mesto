export class Api {
    constructor(params) {
        this._baseUrl = params.baseUrl;
        this._headers = params.headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    //загрузка данных профиля
    getProfile() {
        return fetch(
<<<<<<< HEAD
                `${this._baseUrl}/users/me`, {
                    method: 'GET',
                    headers: this._headers
                }
            )
            .then(this._checkResponse);
=======
            `${this._baseUrl}/users/me`,
            {
                method: 'GET',
                headers: this._headers
            }
        )
        .then(this._checkResponse);
>>>>>>> 62f5bc51cb8b410dffc78068b3504b84469d0c06
    }

    // обновление данных пользоателя
    patchProfile(name, about) {
        return fetch(
<<<<<<< HEAD
                `${this._baseUrl}/users/me`, {
                    method: 'PATCH',
                    headers: this._headers,
                    body: JSON.stringify({
                        name: name,
                        about: about
                    })
                }
            )
            .then(this._checkResponse);
    }

    // обновление фото пользоателя
    patchProfilePhoto(link) {
        return fetch(
                `${this._baseUrl}/users/me/avatar`, {
                    method: 'PATCH',
                    headers: this._headers,
                    body: JSON.stringify({
                        avatar: link
                    })
                }
            )
            .then(this._checkResponse);
    }
=======
            `${this._baseUrl}/users/me`,
            {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify ({
                    name: name,
                    about: about
                })
            }
        )
        .then(this._checkResponse);
    } 

    // обновление фото пользоателя
    patchProfilePhoto(link) {
        return fetch( 
            `${this._baseUrl}/users/me/avatar`,
            {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify ({avatar: link})
            }
        )
        .then(this._checkResponse);
    } 
>>>>>>> 62f5bc51cb8b410dffc78068b3504b84469d0c06


    //запрашиваем массив карточек с сервера
    getInitialCards() {
        return fetch(
<<<<<<< HEAD
                `${this._baseUrl}/cards`, {
                    method: 'GET',
                    headers: this._headers
                }
            )
            .then(this._checkResponse);
=======
            `${this._baseUrl}/cards`,
            {
                method: 'GET',
                headers: this._headers
            }
        )
        .then(this._checkResponse);
>>>>>>> 62f5bc51cb8b410dffc78068b3504b84469d0c06
    }

    //создаём новую карточку
    createNewCard(name, link) {
        return fetch(
<<<<<<< HEAD
                `${this._baseUrl}/cards`, {
                    method: 'POST',
                    headers: this._headers,
                    body: JSON.stringify({
                        name: name,
                        link: link
                    })
                }
            )
            .then(this._checkResponse);
    }

    like(id) {
        return fetch(this._url + `/cards/likes/${id}`, {
                method: 'PUT',
                headers: this._headers
            })
            .then(this._checkResponse)
    }

    dislike(id) {
        return fetch(this._url + `/cards/likes/${id}`, {
                method: 'DELETE',
                headers: this._headers
            })
            .then(this._checkResponse)
    }


    deleteCard(cardId) {
        return fetch(
                `${this._baseUrl}/cards/${cardId}`, {
                    method: 'DELETE',
                    headers: this._headers
                }
            )
            .then(this._checkResponse);
=======
            `${this._baseUrl}/cards`,
            {
                method: 'POST',
                headers: this._headers,
                body: JSON.stringify({
                    name: name,
                    link: link
                })
            }
        )
        .then(this._checkResponse);
    }

    //удаление карточки
    deleteCard(cardId) {
        return fetch(
            `${this._baseUrl}/cards/${cardId}`,
            {
                method: 'DELETE',
                headers: this._headers
            }
        )
        .then(this._checkResponse);
>>>>>>> 62f5bc51cb8b410dffc78068b3504b84469d0c06
    }

    //обновляем статус карточки
    updateLikeStatus(cardId, isLiked) {
        if (isLiked) {
            return this._removeLike(cardId);        
        } else {
            return this._addLike(cardId);
        }
    }

    //установить лайк на карточку
    _addLike(cardId) {
        return fetch(
            `${this._baseUrl}/cards/${cardId}/likes`,
            {
                method: 'PUT',
                headers: this._headers
            }
        )
        .then(this._checkResponse);
    }

    //снять лайк с карточки
    _removeLike(cardId) {
        return fetch(
            `${this._baseUrl}/cards/${cardId}/likes`,
            {
                method: 'DELETE',
                headers: this._headers
            }
        )
        .then(this._checkResponse);
    }

    
}