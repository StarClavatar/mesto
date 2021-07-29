//массив стандартного набора карточек, которые долэны загружаться с сервера
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
const popupTitleInput = popupAddCard.querySelector('.popup__input_edit_title')
const popupPhotoLinkInput = popupAddCard.querySelector('.popup__input_edit_short-description')
const closeAddCardButton = popupAddCard.querySelector('.popup__close-button')
const popupAddCardSubmitButton = popupAddCard.querySelector('.popup__submit-button')

// zoomImagePopup
const popupZoomImage = document.querySelector('.popup_zoom-image')
const closeZoomImageButton = popupZoomImage.querySelector('.popup__close-button')
const popupZoomImageImg = popupZoomImage.querySelector('.popup__image')
const popupZoomImageCaption = popupZoomImage.querySelector('.popup__image-caption')

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
        //запускаем валидацию 
        //checkValidation ();
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
    //сбрасываем значения инпутов
    popupTitleInput.value = '';
    popupPhotoLinkInput.value = '';
    //дизейблим кнопку
    popupAddCardSubmitButton.classList.add('popup__button_disabled'); 
    popupAddCardSubmitButton.disabled = true; 
    //отображаем форму
    openPopup(popupAddCard);    
});

//обрабатываем событие нажатия на кнопку "сохранить" в новой карточке 
popupAddCard.addEventListener('submit', function(evt){
    //отмена перезагрузки странице при сохранении
    evt.preventDefault();
    //добавляем новую карточку из шаблона в контейнер
    addPhotoToContainer(
        popupTitleInput.value, 
        popupPhotoLinkInput.value
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
function zoomImage (photoName, link) {
    popupZoomImageImg.src = link
    popupZoomImageImg.alt = photoName
    popupZoomImageCaption.textContent = photoName
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
        closePopup(event.target)
    }
}


//вспомогательные функции------------------------------------------------

function openPopup (popup) {
    popup.addEventListener('click', closePopupByBackgroundClick)
    document.addEventListener('keydown', closePopupByEscButton)
    popup.classList.add('popup_opened')
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
    const gridElementTemplate = elementGrid.querySelector('#element-grid-template').content
    const newCard = gridElementTemplate.querySelector('.element-grid__item').cloneNode(true)
    const gridImage = newCard.querySelector('.element-grid__image')

    newCard.querySelector('.element-grid__title').textContent = photoName
    gridImage.src = link
    gridImage.alt = photoName
    
    newCard.querySelector('.element-grid__like-button').addEventListener('click', likeCard)
    newCard.querySelector('.element-grid__remove-button').addEventListener('click', deleteCard)
    gridImage.addEventListener('click', () => zoomImage(photoName, link))
    
    return newCard
}
