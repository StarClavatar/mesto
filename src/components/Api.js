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
            `${this._baseUrl}/users/me`,
            {
                method: 'GET',
                headers: this._headers
            }
        )
        .then(this._checkResponse);
    }

    // обновление данных пользоателя
    patchProfile(name, about) {
        return fetch(
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


    //запрашиваем массив карточек с сервера
    getInitialCards() {
        return fetch(
            `${this._baseUrl}/cards`,
            {
                method: 'GET',
                headers: this._headers
            }
        )
        .then(this._checkResponse);
    }

    //создаём новую карточку
    createNewCard(name, link) {
        return fetch(
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

    
    deleteCard(cardId) {
        return fetch(
            `${this._baseUrl}/cards/${cardId}`,
            {
                method: 'DELETE',
                headers: this._headers
            }
        )
        .then(this._checkResponse);
    }

}