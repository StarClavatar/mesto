export class UserInfo {
    constructor({nameSelector,infoSelector}) {
        this._nameElement = document.querySelector(nameSelector);
        this._infoElement = document.querySelector(infoSelector);
    }

    getUserInfo() {
        return  {
                    name: this._nameElement.textContent,
                    shortDescription: this._infoElement.textContent
                }
    }

    setUserInfo(name, shortDescription) {
        this._nameElement.textContent = name;
        this._infoElement.textContent =  shortDescription;
     }
}
