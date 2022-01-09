export class UserInfo {
    constructor({nameSelector,infoSelector, photoSelector}) {
        this._nameElement = document.querySelector(nameSelector);
        this._infoElement = document.querySelector(infoSelector);
        this._photoElement = document.querySelector(photoSelector);
    }

    getUserInfo() {
        return {
                    name: this._nameElement.textContent,
                    shortDescription: this._infoElement.textContent
               }
    }

    setUserInfo(name, shortDescription) {
        this._nameElement.textContent = name;
        this._infoElement.textContent = shortDescription;
    }

    setUserPhoto(link) {
        this._photoElement.src = link;
        this._photoElement.alt = 'аватар';
    }
}
