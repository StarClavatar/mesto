//импортируем необходимые модули
import {
    Card
} from './Card.js';

import {
    FormValidator
} from './FormValidator.js';

import {
    initialCards
} from './cards_data.js';

// объект с настройками валидации
const validationData = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible'
}

// ID шаблона новой фото
const newCardTemplateId = '#element-grid-template'

// Profile
const profile = document.querySelector('.profile')
const profileTitle = profile.querySelector('.profile__title')
const profileShortDescription = profile.querySelector('.profile__short-description')
const popupEditProfileButton = profile.querySelector('.profile__button_type_edit')
const popupAddCardButton = profile.querySelector('.profile__button_type_add')

//ProfileEditPopup
const popupEditProfile = document.querySelector('.popup_type_edit')
const closeProfileButton = popupEditProfile.querySelector('.popup__close-button')
const popupEditProfileForm = popupEditProfile.querySelector('form')
const popupProfileTitleInput = popupEditProfileForm.querySelector('.popup__input_edit_title')
const popupProfileDescriptionInput = popupEditProfileForm.querySelector('.popup__input_edit_short-description')

//elements grid
const elementGrid = document.querySelector('.element-grid')

// AddCardPopup
const popupAddCard = document.querySelector('.popup_type_add')
const closeAddCardButton = popupAddCard.querySelector('.popup__close-button')
const popupAddCardForm = popupAddCard.querySelector('form')
const popupTitleInput = popupAddCardForm.querySelector('.popup__input_edit_title')
const popupPhotoLinkInput = popupAddCardForm.querySelector('.popup__input_edit_short-description')
const popupAddCardSubmitButton = popupAddCardForm.querySelector('.popup__submit-button')

// zoomImagePopup
const popupZoomImage = document.querySelector('.popup_zoom-image')
const closeZoomImageButton = popupZoomImage.querySelector('.popup__close-button')
const popupZoomImageImg = popupZoomImage.querySelector('.popup__image')
const popupZoomImageCaption = popupZoomImage.querySelector('.popup__image-caption')

// объект для валидации формочки редактирования профиля
const editProfileValidation = new FormValidator(validationData, popupEditProfileForm);
editProfileValidation.enableValidation();

// объект для валидации формочки добавления новой фото
const newPhotoValidation = new FormValidator(validationData, popupAddCardForm);
newPhotoValidation.enableValidation();

//создаём стартовый набор карточек из массива
initialCards.forEach((el) => {
    // addPhotoToContainer(el.name, el.link)
    const card = new Card(el, newCardTemplateId, zoomImage);
    addPhotoToContainer(card.generateCard())
    // console.log(el)
})

//редактирование профиля---------------------------------------------
//заполняем и отображаем форму редактирования профиля
popupEditProfileButton.addEventListener('click', function () {
    // присваиваем значения полям ввода текущему значению
    popupProfileTitleInput.value = profileTitle.textContent
    popupProfileDescriptionInput.value = profileShortDescription.textContent
    // отображаем поп-ап
    openPopup(popupEditProfile)
})

//обработка события нажатия на кнопку "сохранить" поп-апа редактирования профиля
popupEditProfile.addEventListener('submit', function (evt) {
    //отмена перезагрузки странице при сохранении
    //evt.preventDefault()
    //сохраняем значения
    profileTitle.textContent = popupProfileTitleInput.value
    profileShortDescription.textContent = popupProfileDescriptionInput.value
    //закрываем поп-ап
    closePopup(popupEditProfile)
});

//закрываем поп-ап редактирования профиля без сохранения
closeProfileButton.addEventListener('click', function () {
    closePopup(popupEditProfile)
});


//добавление новых карточек-------------------------------------------------------    
//отображаем поп-ап добавления новой карточки с обнулением полей ввода
popupAddCardButton.addEventListener('click', function () {
    //сбрасываем значения инпутов
    popupTitleInput.value = '';
    popupPhotoLinkInput.value = '';
    //отображаем форму
    openPopup(popupAddCard);
});

//обрабатываем событие нажатия на кнопку "сохранить" в новой карточке 
popupAddCard.addEventListener('submit', function (evt) {
    const newCard = new Card({
            name: popupTitleInput.value,
            link: popupPhotoLinkInput.value
        },
        newCardTemplateId, zoomImage)
    //добавляем новую карточку из шаблона в контейнер
    addPhotoToContainer(newCard.generateCard())
    //закрываем поп-ап
    closePopup(popupAddCard)
})

//добавляем новую фото в список
function addPhotoToContainer(newCard) {
    document.querySelector('.element-grid').prepend(newCard)
}

//закрываем поп-ап редактирования профиля без сохранения
closeAddCardButton.addEventListener('click', function () {
    closePopup(popupAddCard)
});

// увеличение картинки--------------------------------------------------
//обработчик события при нажатии на карточку для увеличения
function zoomImage(photoName, link) {
    popupZoomImageImg.src = link
    popupZoomImageImg.alt = photoName
    popupZoomImageCaption.textContent = photoName
    openPopup(popupZoomImage)
}

//закрываем поп-ап увеличения картинки
closeZoomImageButton.addEventListener('click', function () {
    closePopup(popupZoomImage)
});

//вспомогательные функции------------------------------------------------
// отображаем переданный в качестве параметра попап
function openPopup(popup) {
    popup.addEventListener('mousedown', closePopupByBackgroundClick)
    document.addEventListener('keydown', closePopupByEscButton)
    popup.classList.add('popup_opened')
}

// закрываем переданный в параметре попап
function closePopup(popup) {
    popup.removeEventListener('click', closePopupByBackgroundClick)
    document.removeEventListener('keydown', closePopupByEscButton)
    popup.classList.remove('popup_opened')
}

//закрытие поп-апа по нажатию клавиши escape
function closePopupByEscButton(event) {
    if (event.key === 'Escape') {
        const currentPopup = document.querySelector('.popup_opened')
        closePopup(currentPopup)
    }
}

//закрытие поп-апа по клику на фон
function closePopupByBackgroundClick(event) {
    if (event.target === event.currentTarget) {
        closePopup(event.target)
    }
}