const initialCards = [
    {
      name: 'Xincun, Hainan',
      link: './images/XinCun.jpg'
    },
    {
      name: 'The Romantic Park',
      link: './images/TheRomanticPark.jpg'
    },
    {
      name: 'The Lost Chambers Aquarium',
      link: './images/theLostChambersAquarium.jpg'
    },
    {
      name: 'The Romantic Park',
      link: './images/TheRomanticPark2.jpg'
    },
    {
      name: 'Yanoda park',
      link: './images/parkYanoda.jpg'
    },
    {
      name: 'Гангстер со стажем',
      link: './images/kama.jpeg'
    },
  ];

// Profile
const profile = document.querySelector('.profile')
const profileTitle = profile.querySelector('.profile__title')
const profileShortDescription = profile.querySelector('.profile__short-description')
const popupEditProfileButton = profile.querySelector('.profile__button_type_edit')
const popupAddCardButton = profile.querySelector('.profile__button_type_add')
  
//ProfilePopup
const popupEditProfile = document.querySelector('.popup_type_edit')
const popupProfileTitleInput = popupEditProfile.querySelector('.popup__input_edit_title')
const popupProfileDescriptionInput = popupEditProfile.querySelector('.popup__input_edit_short-description')
const closeProfileButton= popupEditProfile.querySelector('.popup__close-button')

//elements grid
const elementGrid = document.querySelector('.element-grid')

// AddCardPopup
const popupAddCard = document.querySelector('.popup_type_add')
const closeAddCardButton = popupAddCard.querySelector('.popup__close-button')

// zoomImagePopup
const popupZoomImage = document.querySelector('.popup_zoom-image')
const closeZoomImageButton = popupZoomImage.querySelector('.popup__close-button')

//создаём стартовый набор карточек из массива
initialCards.forEach(function(el){
    addPhotoToContainer(el.name, el.link)
})

//редактирование профиля---------------------------------------------
//заполняем и отображаем форму редактирования профиля
popupEditProfileButton.addEventListener('click', function(){
        // присваиваем значения полям ввода текущему значению
        popupProfileTitleInput.value = profileTitle.textContent
        popupProfileDescriptionInput.value = profileShortDescription.textContent
        // отображаем поп-ап
        openPopup(popupEditProfile)
})

//обработка события нажатия на кнопку "сохранить" поп-апа редактирования профиля
popupEditProfile.addEventListener('submit', function(evt){
    //отмена перезагрузки странице при сохранении
    //evt.preventDefault()
    //сохраняем значения
    profileTitle.textContent = popupProfileTitleInput.value
    profileShortDescription.textContent = popupProfileDescriptionInput.value
    //закрываем поп-ап
    closePopup(popupEditProfile)
});

//закрываем поп-ап редактирования профиля без сохранения
closeProfileButton.addEventListener('click', function(){
    closePopup(popupEditProfile)
});


//добавление карточки, удаление, лайк и увеличение карточек-------------------------------------------------------    

//отображаем поп-ап добавления новой карточки с обнулением полей ввода
popupAddCardButton.addEventListener('click', function(){
    popupAddCard.querySelector('.popup__input_edit_title').value = '';
    popupAddCard.querySelector('.popup__input_edit_short-description').value = '';
    openPopup(popupAddCard)
});

//обрабатываем событие нажатия на кнопку "сохранить" в новой карточке 
popupAddCard.addEventListener('submit', function(evt){
    //отмена перезагрузки странице при сохранении
    evt.preventDefault();
    //добавляем новую карточку из шаблона в контейнер
    addPhotoToContainer(
        popupAddCard.querySelector('.popup__input_edit_title').value, 
        popupAddCard.querySelector('.popup__input_edit_short-description').value
    )
    //закрываем поп-ап
    closePopup(popupAddCard)   
})

//закрываем поп-ап редактирования профиля без сохранения
closeAddCardButton.addEventListener('click', function(){
    closePopup(popupAddCard)
});

//функции для лайка и удаления и увеличения карточек
function likeCard (el){
    el.currentTarget.classList.toggle('element-grid__like-button_active')
}

// обработчик клика на кнопку удаления карточки
function deleteCard (el) {
    el.currentTarget.parentElement.remove()
}

//обработчик события при нажатии на карточку для увеличения
function zoomImage (el) {
    popupZoomImage.querySelector('.popup__image').src = el.currentTarget.src
    popupZoomImage.querySelector('.popup__image').alt = el.currentTarget.alt 
    popupZoomImage.querySelector('.popup__image-caption').textContent = el.currentTarget.parentElement.querySelector('.element-grid__title').textContent
    openPopup(popupZoomImage)

}

//закрываем поп-ап увеличения картинки
closeZoomImageButton.addEventListener('click', function(){
    closePopup(popupZoomImage)
});

//закрытие поп-апа по нажатию клавиши escape
function closePopupByEscButton(event) {
    if(event.key === 'Escape') {
        const currentPopup = document.querySelector('.popup_opened')
        closePopup(currentPopup)
    }
}


//закрытие поп-апа по клику на фон
function closePopupByBackgroundClick(event){
    if(event.target === event.currentTarget){
        const currentPopup = document.querySelector('.popup_opened')
        closePopup(currentPopup)
    }
}


//вспомогательные функции------------------------------------------------

function openPopup (popup) {
    popup.addEventListener('click', closePopupByBackgroundClick)
    document.addEventListener('keydown', closePopupByEscButton)
    popup.classList.add('popup_opened')
    if (popup!=popupZoomImage) checkValidation ();
}

function closePopup(popup) {
    popup.removeEventListener('click', closePopupByBackgroundClick)
    document.removeEventListener('keydown', closePopupByEscButton)
    popup.classList.remove('popup_opened')

}

function addPhotoToContainer (photoName, link) {
    document.querySelector('.element-grid').prepend(createNewPhoto(photoName, link))
}

//создаём новую карточку из шаблона и подписываемся на события like, delete, zoom
function createNewPhoto (photoName, link) {
    let gridElementTemplate = elementGrid.querySelector('#element-grid-template').content
    let newCard = gridElementTemplate.querySelector('.element-grid__item').cloneNode(true)

    newCard.querySelector('.element-grid__title').textContent = photoName
    newCard.querySelector('.element-grid__image').src = link
    newCard.querySelector('.element-grid__image').alt = photoName
    
    newCard.querySelector('.element-grid__like-button').addEventListener('click', likeCard)
    newCard.querySelector('.element-grid__remove-button').addEventListener('click', deleteCard)
    newCard.querySelector('.element-grid__image').addEventListener('click', zoomImage)
    
    return newCard
}
