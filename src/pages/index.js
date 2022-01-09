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
    Api
} from '../components/Api.js';

import {
    newCardTemplateId,
    validationData,
    initialCards,
    profileTitleSelector,
    profileShortSelector,
    profilePhotoSelector,
    popupEditProfileButton,
    popupAddCardButton,
    popupEditProfileSelector,
    popupEditProfileNameId,
    popupEditProfileDescId,
    popupEditProfileForm,
    popupProfilePhotoSelector,
    popupProfilePhotoUrlSelector,
    popupProfilePhotoForm,
    ProfilePhotoEditButton,
    popupPhotoTitleInputId,
    popupPhotoLinkInputId,
    elementGridSelector,
    popupAddCardForm,
    popupAddCardSelector,
    apiToken,
    apiBaseUrl
} from '../utils/constants.js';

//создаём объект для работы с API
const api = new Api({
    baseUrl: apiBaseUrl,
    headers: {
        authorization: apiToken,
        'Content-Type': 'application/json'
    }
});
//объект с данными о профиле
const userInfo = new UserInfo({
    nameSelector: profileTitleSelector,
    infoSelector: profileShortSelector,
    photoSelector: profilePhotoSelector
})

//переменная для хранения профиля пользователя
let userId

//загружаем профиль пользователя с сервера
api.getProfile() 
.then(result => {
    userId = result._id;
    userInfo.setUserInfo(result.name, result.about);
    userInfo.setUserPhoto(result.avatar);
})
.catch(err => { console.log(err) })

// объект для валидации формочки редактирования профиля
const editProfileValidation = new FormValidator(validationData, popupEditProfileForm);
editProfileValidation.enableValidation();

// объект для валидации формочки редактирования фото профиля
const editProfilePhotoValidation = new FormValidator(validationData, popupProfilePhotoForm);
editProfilePhotoValidation.enableValidation();

// объект для валидации формочки добавления новой фото
const newPhotoValidation = new FormValidator(validationData, popupAddCardForm);
newPhotoValidation.enableValidation();

//объект отвечающий за отрисовку карточек в нужном месте страницы
const section = new Section({
        items: initialCards,
        renderer: item => {
            section.appendItem(generateCardMarkup(item.name, item.link, item.likes, item._id, item.owner._id));
        }
    },
    elementGridSelector);

//загрузка и отрисовка карточек
api.getInitialCards()
    .then((result) => {
        //рисуем все карточки
        section.renderItems(result);
    })
    .catch((err) => console.log(err));

//создаём объект-формочку редактирования профиля 
const popupEdit = new PopupWithForm(popupEditProfileSelector, (values) => {
    popupEdit.renderLoadingStatus(true);
    api.patchProfile(values[popupEditProfileNameId], values[popupEditProfileDescId])
    .then(result => {
        userInfo.setUserInfo(result.name, result.about);
     })
    .catch(err => { console.log(err) })
    .finally(popupEdit.renderLoadingStatus(false));
});
popupEdit.setEventListeners();

//создаём объект-формочку редактирования фото профиля 
const popupProfilePhoto = new PopupWithForm(popupProfilePhotoSelector, (values) => {
    popupEdit.renderLoadingStatus(true);
    api.patchProfilePhoto(values[popupProfilePhotoUrlSelector])
    .then(result => {
        userInfo.setUserPhoto(result.avatar);
     })
    .catch(err => { console.log(err) })
    .finally(popupEdit.renderLoadingStatus(false));
});
popupProfilePhoto.setEventListeners();


//создаём объект-формочку новой фото 
const popupNewPhoto = new PopupWithForm(popupAddCardSelector, inputsValues => {
    //создаём новую карточку на сервере
    api.createNewCard(inputsValues[popupPhotoTitleInputId], inputsValues[popupPhotoLinkInputId])
        .then(result => {
            section.prependItem(generateCardMarkup(
                result.name,
                result.link,
                result.likes,
                result._id,
                result.owner._id))        
        })
        .catch(err=>{console.log(err)});
})
popupNewPhoto.setEventListeners();

//инициализируем формочку для зумирования карточек
const imagePopup = new PopupWithImage('.popup_zoom-image');
imagePopup.setEventListeners();

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

//редактирование фото профиля---------------------------------------------
//заполняем и отображаем форму редактирования фото профиля
ProfilePhotoEditButton.addEventListener('click', () => {
    //отображаем popup редактирования фото профиля
    popupProfilePhoto.open();
    //тоглим кнопку
    editProfilePhotoValidation.toggleButtonState();
})

//добавление новых карточек-------------------------------------------------------    
//отображаем поп-ап добавления новой карточки с обнулением полей ввода
popupAddCardButton.addEventListener('click', function () {
    newPhotoValidation.toggleButtonState();
    // присваиваем значения полям ввода текущему значению
    popupNewPhoto.open();
});

//функция создаёт новую карточку в памяти и генерирует ее разметку
function generateCardMarkup(name, link, likes=[], cardId='', ownerId=apiToken) {
    const card = new Card({
        id: cardId,    
        name: name,
        link: link,
        likes: likes,
        userId: ownerId
    }, newCardTemplateId, zoomImage, likeCard, deleteCard, userId)
    return card.generateCard()
}

//колбаск зумирования карточки, который указывается в конструкторе карточки
function zoomImage(name, link) {
    imagePopup.open(link, name);
}

//колбаск лайка карточки
function likeCard(card) {
    // imagePopup.open(link, name);
}

//колбаск удаления карточки
function deleteCard(card) {
    // imagePopup.open(link, name);
}

