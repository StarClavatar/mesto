export class FormValidator {

    constructor(data, formToValidate) {

        //разложим по отдельным переменным объект data
        this._inputSelector = data.inputSelector
        this._submitButtonSelector = data.submitButtonSelector
        this._inactiveButtonClass = data.inactiveButtonClass
        this._inputErrorClass = data.inputErrorClass
        this._errorClass = data.errorClass
        this._formToValidate = formToValidate

        // запомним список всех imput'ов и сслку на кнопку "сохранить" в приватных переменных 
        this._inputList = Array.from(this._formToValidate.querySelectorAll(this._inputSelector));
        this._buttonElement = this._formToValidate.querySelector(this._submitButtonSelector);
    }

    //пробегаемся по массиву открытых форм, подписываемся на события и выполняем проверку валидности
    enableValidation() {
        //отмена перезагрузки страницы при нажатии на кнопку сохранения
        this._formToValidate.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        // подписываемся на события ввода текста во все imput'ы 
        this._setEventListeners();
        // выставляем состояние кнопки Submit
        this.toggleButtonState();
    }


    //вешает слушатели на ввод каждого символа во все input'ы формы и запускает проверку на валидность
    _setEventListeners() {
        // подпишемся на ввод с клавиатуры данных во все input'ы с запуском проверки валидности
        this._inputList.forEach((input) => {
            input.addEventListener('input', (evt) => {
                this._showInputsValidity(evt.currentTarget);
                this.toggleButtonState();
            })
        });
    }

    //управляет состоянием кнопки в зависимости от наличия невалидных input'ов
    toggleButtonState() {
        // проверим есть ли невалидные данные в любом input'е
        if (this._hasInvalidInput()) {
            // если есть невалидные imput'ы гасим кнопку "Сохранить"
            this._buttonElement.classList.add(this._inactiveButtonClass);
            this._buttonElement.disabled = true;
        } else {
            // если нет невалидных imput'ов делаем кнопку "Сохранить" дотупной для нажатия
            this._buttonElement.classList.remove(this._inactiveButtonClass);
            this._buttonElement.disabled = false;
        }
    }

    // отображение признака валидности input'а
    _showInputsValidity(input) {
        if (!input.validity.valid) {
            // Если input не валидный - показываем ошибку 
            this._showInputError(input);
        } else {
            // Если валидно - скроем ошибку 
            this._hideInputError(input);
        }
    }

    //функция возвращает true если есть любой невалидный input
    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }

    //показ соответствующего span'а с ошибкой
    _showInputError(input) {
        //добавляем признак ошибки у input'а
        input.classList.add(this._inputErrorClass);
        //выбор span'а по id input'а
        const errorSpan = this._formToValidate.querySelector(`#${input.id}-error`);
        errorSpan.classList.add(this._errorClass);
        errorSpan.textContent = input.validationMessage;
    }

    //скрытие соответствующего span'а с ошибкой 
    _hideInputError(input) {
        // удаляем признак ошибки у input'а
        input.classList.remove(this._inputErrorClass);
        //выбор span'а по id input'а
        const errorSpan = this._formToValidate.querySelector(`#${input.id}-error`);
        errorSpan.classList.remove(this._errorClass);
        errorSpan.textContent = '';
    }

}