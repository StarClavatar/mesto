import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(selector, submitCallBack) {
        super(selector);
        this._submitCallBack = submitCallBack;
        this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
        this._submitButton = this._popup.querySelector('button[type="submit"]');
        this._submitText = this._submitButton.textContent; 
    }
    
    _getInputValues() {
        const inputsVal = {};
        this._inputList.forEach(item => { inputsVal[item.id] = item.value });
        return inputsVal;
    }

    open(inputsVal) {
        if (inputsVal) this._inputList.forEach(item => { item.value = inputsVal[item.id] });
        super.open();
    }

    close() {
        super.close();
        this._inputList.forEach(item => { item.value = '' });
    }

    setEventListeners() {
        super.setEventListeners();
        //ввиду того, что bind создаёт новую функцию, 
        //мы ее запоминаем в скрытом свойстве для последующей подписки и отписки
        this._onSubmitBind = this._onSubmit.bind(this);
        //подписываемся по уникальному ID 
        this._popup.addEventListener('submit', this._onSubmitBind);
    }

    renderLoadingStatus(isLoading) {
        if (isLoading) {
            this._submitButton.textContent = 'Сохрание...';
        } else {
            this._submitButton.textContent = this._submitText;
        }
    }

    _onSubmit() {
        this._submitCallBack(this._getInputValues());
        // this.close();
    }
}