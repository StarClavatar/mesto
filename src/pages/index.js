import './index.css'; // импорт главного файла стилей вместо тега link в index.html

//импортируем необходимые модули
import { Section } from '../components/Section.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

import {
    newCardTemplateId,
    validationData,
    initialCards,
    profileTitleSelector,
    profileShortSelector,
    popupEditProfileButton,
    popupAddCardButton,
    popupEditProfileSelector,
    popupEditProfileNameId,
    popupEditProfileDescId,
    popupEditProfileForm,
    popupPhotoTitleInputId,
    popupPhotoLinkInputId,
    elementGridSelector,
    popupAddCardForm,
    popupAddCardSelector,
} from '../utils/constants.js';

// объект для валидации формочки редактирования профиля
const editProfileValidation = new FormValidator(validationData, popupEditProfileForm);
editProfileValidation.enableValidation();

// объект для валидации формочки добавления новой фото
const newPhotoValidation = new FormValidator(validationData, popupAddCardForm);
newPhotoValidation.enableValidation();

//объект с данными о профиле
const userInfo = new UserInfo({ nameSelector:profileTitleSelector, infoSelector:profileShortSelector })

//объект отвечающий за отрисовку карточек в нужном месте страницы
const section = new Section(
    {
        items: initialCards,
        renderer: item => {
                            const card = new Card(item, newCardTemplateId, zoomImage);
                            section.addItem(card.generateCard());
                          }
    },
    elementGridSelector);

//рисуем все карточки
section.renderItems();

//редактирование профиля---------------------------------------------
//заполняем и отображаем форму редактирования профиля
popupEditProfileButton.addEventListener('click', ()=> {
    //создаём объект-формочку редактирования профиля 
    const popupEdit = new PopupWithForm(popupEditProfileSelector, values => {
        userInfo.setUserInfo(
            values[popupEditProfileNameId],
            values[popupEditProfileDescId]
        )
    });
    popupEdit.setEventListeners();
    // присваиваем значения полям ввода текущему значению
    const userInf = userInfo.getUserInfo();
    popupEdit.open({[popupEditProfileNameId]: userInf.name,
                    [popupEditProfileDescId]: userInf.shortDescription});
    //тоглим кнопку
    editProfileValidation.toggleButtonState();
})

//добавление новых карточек-------------------------------------------------------    
//отображаем поп-ап добавления новой карточки с обнулением полей ввода
popupAddCardButton.addEventListener('click', function () {
    //создаём объект-формочку новой фото 
    const popupNewPhoto = new PopupWithForm(popupAddCardSelector, inputsValues => {
        const card = new Card(
            {
                name: inputsValues[popupPhotoTitleInputId],
                link: inputsValues[popupPhotoLinkInputId]
            },
        newCardTemplateId, zoomImage);
        section.addItem(card.generateCard());
     });

    popupNewPhoto.setEventListeners();
    newPhotoValidation.toggleButtonState();
    // присваиваем значения полям ввода текущему значению
    popupNewPhoto.open();
});

//колбаск зумирования карточки, который указывается в конструкторе карточки
function zoomImage(name,link) {
    const pop = new PopupWithImage('.popup_zoom-image');
    pop.setEventListeners();
    pop.open(link,name);
}