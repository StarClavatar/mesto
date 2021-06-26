let popup = document.querySelector('.popup')
let saveButton = popup.querySelector('.popup__save-button')
let closeButton = popup.querySelector('.popup__close-button')
let profile = document.querySelector('.profile')
let popupOpenButton = profile.querySelector('.profile__button_type_edit')
let profileTitle = profile.querySelector('.profile__title')
let profileShortDescription = profile.querySelector('.profile__short-description')
let editPopupTitle = popup.querySelector('.popup__input_edit_title')
let editPopupShortDescription = popup.querySelector('.popup__input_edit_short-description')


let openPopup = function () {
    
    editPopupTitle.value = profileTitle.textContent
    editPopupShortDescription.value = profileShortDescription.textContent

    popup.classList.add('popup_opened');
}

let closePopup = function() {
    popup.classList.remove('popup_opened')
}

let saveInputText = function(save) {
    save.preventDefault()
    profileTitle.textContent = editPopupTitle.value
    profileShortDescription.textContent = editPopupShortDescription.value
    closePopup()
}
// https://yandex.ru/video/preview/?filmId=3620754122386298535&from=tabbar&text=submit+eventListener+js



popupOpenButton.addEventListener('click', openPopup)
closeButton.addEventListener('click', closePopup)
popup.addEventListener('submit', saveInputText)

