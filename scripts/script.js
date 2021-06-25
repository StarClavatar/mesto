let popup = document.querySelector('.popup')
let saveButton = popup.querySelector('.popup__save-button')
let closeButton = popup.querySelector('.popup__close-button')
let profile = document.querySelector('.profile')
let popupOpenButton = profile.querySelector('.profile__button_type_edit')
let popupTitle = profile.querySelector('.profile__title')
let popupShortDescription = profile.querySelector('.profile__short-description')
let editPopupTitle = popup.querySelector('.popup__input_edit_title')
let editPopupShortDescription = popup.querySelector('.popup__input_edit_short-description')


let openPopup = function () {
    popup.classList.add('popup__opened');
}

let closePopup = function() {
    popup.classList.remove('popup__opened')
}

let saveInputText = function(save) {
    save.preventDefault()
    popupTitle.textContent = editPopupTitle.value
    popupShortDescription.textContent = editPopupShortDescription.value
    closePopup()
}
// https://yandex.ru/video/preview/?filmId=3620754122386298535&from=tabbar&text=submit+eventListener+js



popupOpenButton.addEventListener('click', openPopup)
closeButton.addEventListener('click', closePopup)
popup.addEventListener('submit', saveInputText)

