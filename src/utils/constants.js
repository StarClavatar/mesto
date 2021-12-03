//массив стандартного набора карточек, которые должны загружаться с сервера
// этот блок необходим для webpack. Сначала объявляем url, потом их используем в массиве
const XinCun = new URL('.././images/XinCun.jpg',
    import.meta.url);
const TheRomanticPark = new URL('.././images/TheRomanticPark.jpg',
    import.meta.url);
const theLostChambersAquarium = new URL('.././images/theLostChambersAquarium.jpg',
    import.meta.url);
const TheRomanticPark2 = new URL('.././images/TheRomanticPark2.jpg',
    import.meta.url);
const parkYanoda = new URL('.././images/parkYanoda.jpg',
    import.meta.url);
const kama = new URL('.././images/kama.jpeg',
    import.meta.url);
//

export const initialCards = [{
        name: 'Xincun, Hainan',
        link: XinCun //теперь вместо url переменная, объявленая выше (необходимо для webpack)
    },
    {
        name: 'The Romantic Park',
        link: TheRomanticPark
    },
    {
        name: 'The Lost Chambers Aquarium',
        link: theLostChambersAquarium
    },
    {
        name: 'The Romantic Park',
        link: TheRomanticPark2
    },
    {
        name: 'Yanoda park',
        link: parkYanoda
    },
    {
        name: 'Гангстер со стажем',
        link: kama
    }
];

// объект с настройками валидации
export const validationData = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible'
}

// ID шаблона новой фото
export const newCardTemplateId = '#element-grid-template'

// Profile
const profile = document.querySelector('.profile')
export const profileTitleSelector = '.profile__title'
export const profileShortSelector = '.profile__short-description'
export const profileTitle = profile.querySelector('.profile__title')
export const popupEditProfileButton = profile.querySelector('.profile__button_type_edit')
export const popupAddCardButton = profile.querySelector('.profile__button_type_add')

//ProfileEditPopup
export const popupEditProfileSelector = '.popup_type_edit';
export const popupEditProfileNameId = 'name-input';
export const popupEditProfileDescId = 'job-input';
export const popupEditProfile = document.querySelector('.popup_type_edit')
export const popupEditProfileForm = popupEditProfile.querySelector('form')

//elements grid
export const elementGridSelector = '.element-grid'

// AddCardPopup
export const popupAddCardSelector = '.popup_type_add'
export const popupAddCard = document.querySelector(popupAddCardSelector)
export const closeAddCardButton = popupAddCard.querySelector('.popup__close-button')
export const popupAddCardForm = popupAddCard.querySelector('form')
export const popupPhotoTitleInputId = 'place-name-input'
export const popupPhotoLinkInputId = 'place-img-input'

// zoomImagePopup
export const popupZoomImage = document.querySelector('.popup_zoom-image')
export const closeZoomImageButton = popupZoomImage.querySelector('.popup__close-button')
export const popupZoomImageImg = popupZoomImage.querySelector('.popup__image')
export const popupZoomImageCaption = popupZoomImage.querySelector('.popup__image-caption')