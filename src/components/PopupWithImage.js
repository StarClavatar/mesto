import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    open(link, name) {
        this._popup.querySelector('.popup__image').src = link;
        this._popup.querySelector('.popup__image').alt = name;
        this._popup.querySelector('.popup__image-caption').textContent = name;
        super.open();
        this._popup.focus(); //надо для того, чтобы сработала клавиша esc для закрытия формы
    }
}