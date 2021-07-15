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


let profile = document.querySelector('.profile')
let profileTitle = profile.querySelector('.profile__title')
let profileShortDescription = profile.querySelector('.profile__short-description')

let popup = document.querySelector('.popup')
let popupHeading = document.querySelector('.popup__title')
let editPopupTitle = popup.querySelector('.popup__input_edit_title')
let editPopupShortDescription = popup.querySelector('.popup__input_edit_short-description')

let saveButton = popup.querySelector('.popup__save-button')
let closeButton = popup.querySelector('.popup__close-button')

let popupOpenButton = profile.querySelector('.profile__button_type_edit')
let popupAddButton = profile.querySelector('.profile__button_type_add')


let openPopup = function() {
    popup.classList.add('popup_opened');
}

let closePopup = function() {
    popup.classList.remove('popup_opened')
}

//если isEditMode = true, то форма редактирования профиля, false - форма добавления новой картинки
let isEditMode;

let openEditPopup = function () {
    popupHeading.textContent = 'Редактировать профиль'
    // присваиваем значения полям ввода текущему значению
    editPopupTitle.value = profileTitle.textContent
    editPopupShortDescription.value = profileShortDescription.textContent
    
    isEditMode = true;
    openPopup()
}

let openAddPopup = function() {
    //меняем названия полей ввода и заголовок поп-апа
    popupHeading.textContent = 'Новое место'
    editPopupTitle.placeholder = 'Название'
    editPopupShortDescription.placeholder = 'Ссылка на картинку'

    editPopupTitle.value = ''
    editPopupShortDescription.value = ''

    isEditMode = false;

    openPopup()
}


let saveInputText = function(save) {
    save.preventDefault()
    if (isEditMode) {
        profileTitle.textContent = editPopupTitle.value
        profileShortDescription.textContent = editPopupShortDescription.value
    } else {
        createNewPhoto(editPopupTitle.value ,editPopupShortDescription.value)
    }
    closePopup()
}
function cardLike () {
likeButton.classList.toggle('element-grid__like-button_active')
}

function createNewPhoto (photoName, link) {
    let gridElementTemplate = document.querySelector('#element-grid-template').content
    let newCard = gridElementTemplate.querySelector('.element-grid__item').cloneNode(true)
    
    newCard.querySelector('.element-grid__title').textContent = photoName
    newCard.querySelector('.element-grid__image').src = link
    
    newCard.querySelector('.element-grid__remove-button').addEventListener('click', function(e){
        e.target.closest('.element-grid__item').remove();
    })

    newCard.querySelector('.element-grid__like-button').addEventListener('click', function(e){
        e.target.classList.toggle('element-grid__like-button_active');
    })

    newCard.querySelector('.element-grid__image').addEventListener('click', function(e){
        document.querySelector('.popup__image').src = e.target.src
        document.querySelector('.popup__image-caption').textContent = photoName
        document.querySelector('.popup__zoom-image').style.visibility = 'visible'
        
    })

    document.querySelector('.element-grid').prepend(newCard)
}

document.querySelector('.popup__close-button_place-image').addEventListener('click', function(){
    document.querySelector('.popup__zoom-image').style.visibility = 'hidden'

})


popupOpenButton.addEventListener('click', openEditPopup)
popupAddButton.addEventListener('click', openAddPopup)
closeButton.addEventListener('click', closePopup)
popup.addEventListener('submit', saveInputText)

//другой вариант добавления слушателей
// function gridClicked(me){
//    //alert (el.target)
//    if (me.target.classList.contains('element-grid__like-button')){
//         me.target.classList.toggle('element-grid__like-button_active');
//     }else if(me.target.classList.contains('element-grid__remove-button')){
//         me.target.parentElement.remove();
//     }
// }

function cardDelete(event){
    let card = event.target.closest('.element-grid__item');
    card.remove()
}

//document.querySelector('.element-grid').addEventListener('click',gridClicked)


initialCards.forEach(function(el){
    createNewPhoto(el.name, el.link)
})



