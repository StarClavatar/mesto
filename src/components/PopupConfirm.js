import { Popup } from "./Popup.js";

export class PopupConfirm extends Popup{
    constructor(selector,submitCallback) {
        super(selector);
        this._form = this._popup.querySelector('form');
        this._submitCallback = submitCallback;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (ev) => {
            ev.preventDefault();
            this._submitCallback(this._confirmObject);
        })
    }

    open(confirmObject) {
        this._confirmObject = confirmObject;
        super.open();
    }
}