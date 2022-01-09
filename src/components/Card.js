export class Card {
    constructor(data, templateSelector, handleCardClick, handleCardLike, handleCardDelete, myId) {
        this._id = data.id;
        this._name = data.name;
        this._link = data.link;
        this._userId = data.userId;
        this._likes = data.likes;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleCardLike = handleCardLike;
        this._handleCardDelete = handleCardDelete;
        this._myId = myId;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.element-grid__item')
            .cloneNode(true);

        return cardElement;
    }

    //создаем карточку из шаблона html, подписываемся на события элементов, заполняем нужные элементы, возвращаем готовую разметку
    generateCard() {
        // запомним разметку в приватную переменную _element. 
        // Так у других элементов появится доступ к ней.
        this._element = this._getTemplate();
        //запомним элемент картинки в приватной переменной 
        this._gridImage = this._element.querySelector('.element-grid__image')
        //запомним элемент с кнопкой лайка карточки
        this._likeButton=this._element.querySelector('.element-grid__like-button');
        //запомним элемент с кнопкой удаления карточки
        this._DeleteButton = this._element.querySelector('.element-grid__remove-button');            
        //запомним элемент с количеством лайков
        this._LikesCount = this._element.querySelector('.element-grid__like-counter');            
        
        //добавим обработчики
        this._setEventListeners();

        // Добавим данные для картинки
        this._gridImage.src = this._link;
        this._gridImage.alt = this._name;
        //подпишем карточку
        this._element.querySelector('.element-grid__title').textContent = this._name;
        //поставим количество лайков
        this._LikesCount.textContent = this._likes.length;
        //скроем кнопку удаления, если карточка не наша
        if (this._userId !== this._myId) { this._DeleteButton.style.display = 'none' };

        // Вернём элемент наружу
        return this._element;
    }

    //подписка на необходимые события карточки
    _setEventListeners() {
        //при клике на лайк вызываем у экземпляра карточки приватный метод _likeCard  
        this._likeButton.addEventListener('click', (el) => {
            this._likeCard(el);
        })
        // при клике на удаление вызываем у экземпляра карточки приватный метод _deleteCard
        this._DeleteButton.addEventListener('click', (el) => {
            this._deleteCard(el);
        })
        // при клике на картинку вызываем у экземпляра карточки приватный метод _zoomImage
        this._gridImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link)
        })

    }

    //реализуем приватные методы обработки событий---------------------------------------------

    //функции для лайка и удаления и увеличения карточек
    _likeCard(el) {
        el.currentTarget.classList.toggle('element-grid__like-button_active')
    }

    // обработчик клика на кнопку удаления карточки
    _deleteCard(el) {
        this._element.remove();
        this._element = null;
    }
}