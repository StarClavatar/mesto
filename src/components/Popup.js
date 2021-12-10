
export class Popup {
    constructor(selector) {
        this._selector = selector;
        this._popup = document.querySelector(this._selector);
        this._closeButton = this._popup.querySelector('.popup__close-button');
    }

    open() {
        this._popup.classList.add('popup_opened');
    }

    close() {
        // this._removeEventsListeners();
        this._popup.classList.remove('popup_opened');
    }

    _handleEscClose() {
        this._escapeCloseBind = this._escapeClose.bind(this);
        document.addEventListener('keydown', this._escapeCloseBind);
    }

    _escapeClose(event) {
        if (event.key === 'Escape') {this.close()}
    }

    _closeByBackground(event) {
        if (event.target === event.currentTarget) {
            this.close();
        }
    }

    setEventListeners() {
        this._closeByBackgroundBind = this._closeByBackground.bind(this);
        this._popup.addEventListener('mousedown', this._closeByBackgroundBind);
        this._closeButtonBind = this.close.bind(this);
        this._closeButton.addEventListener('click', this._closeButtonBind);
        this._handleEscClose();
    }

    // _removeEventsListeners() {
    //     this._popup.removeEventListener('click', this._closeByBackgroundBind);
    //     this._closeButton.removeEventListener('click', this._closeButtonBind);
    //     document.removeEventListener('keydown', this._escapeCloseBind);
    // }
    
}

