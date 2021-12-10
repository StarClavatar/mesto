import './index.css'; // импорт главного файла стилей вместо тега link в index.html

//импортируем необходимые модули
import {
    Section
} from '../components/Section.js';
import {
    Card
} from '../components/Card.js';
import {
    FormValidator
} from '../components/FormValidator.js';
import {
    PopupWithImage
} from '../components/PopupWithImage.js';
import {
    PopupWithForm
} from '../components/PopupWithForm.js';
import {
    UserInfo
} from '../components/UserInfo.js';

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
const userInfo = new UserInfo({
    nameSelector: profileTitleSelector,
    infoSelector: profileShortSelector
})

//объект отвечающий за отрисовку карточек в нужном месте страницы
const section = new Section({
        items: initialCards,
        renderer: item => {
            section.appendItem(generateCardMarkup(item.name, item.link));
        }
    },
    elementGridSelector);

//рисуем все карточки
section.renderItems();

//создаём объект-формочку редактирования профиля 
const popupEdit = new PopupWithForm(popupEditProfileSelector, values => {
    userInfo.setUserInfo(
        values[popupEditProfileNameId],
        values[popupEditProfileDescId]
    )
});
popupEdit.setEventListeners();

//создаём объект-формочку новой фото 
const popupNewPhoto = new PopupWithForm(popupAddCardSelector, inputsValues => {
    section.prependItem(generateCardMarkup(inputsValues[popupPhotoTitleInputId], 
                                       inputsValues[popupPhotoLinkInputId]));
})
popupNewPhoto.setEventListeners();

//инициализируем формочку для зумирования карточек
const pop = new PopupWithImage('.popup_zoom-image');
pop.setEventListeners();



//редактирование профиля---------------------------------------------
//заполняем и отображаем форму редактирования профиля
popupEditProfileButton.addEventListener('click', () => {
    // присваиваем значения полям ввода текущему значению
    const userInf = userInfo.getUserInfo();
    popupEdit.open({
        [popupEditProfileNameId]: userInf.name,
        [popupEditProfileDescId]: userInf.shortDescription
    });
    //тоглим кнопку
    editProfileValidation.toggleButtonState();
})

//добавление новых карточек-------------------------------------------------------    
//отображаем поп-ап добавления новой карточки с обнулением полей ввода
popupAddCardButton.addEventListener('click', function () {
    newPhotoValidation.toggleButtonState();
    // присваиваем значения полям ввода текущему значению
    popupNewPhoto.open();
});

//функция генерирует разметку карточки
function generateCardMarkup(name, link) {
    const card = new Card({
        name: name,
        link: link
    }, newCardTemplateId, zoomImage)
    return card.generateCard()
}

//колбаск зумирования карточки, который указывается в конструкторе карточки
function zoomImage(name, link) {
    pop.open(link, name);
}