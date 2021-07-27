


//запускаем проверку валидности для открытых поп-апов и выполняем подписку на ввод в input'ы
function checkValidation(){
    enableValidation({
        formSelector: '.popup_opened',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__input-error_visible'
    }); 
}


//пробегаемся по массиву открытых форм, подписываемся на события и выполняем проверку валидности
function enableValidation({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) { 
    const formList = Array.from(document.querySelectorAll(formSelector)); 
    formList.forEach((form) => { 
        //отмена перезагрузки страницы при нажатии на кнопку сохранения
        form.addEventListener('submit', (evt) => { 
            evt.preventDefault(); 
        }); 
        setEventListeners(form, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass); 
    }); 
}


//вешает слушатели на каждый input открытой формы и проверяет исходные значения на валидность
function setEventListeners (form, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) { 
    const inputList = Array.from(form.querySelectorAll(inputSelector)); 
    const buttonElement = form.querySelector(submitButtonSelector); 
    
    toggleButtonState(inputList, buttonElement, inactiveButtonClass); 
    inputList.forEach((input) => { 
        input.addEventListener('input', () => { 
            isValid(form, input, inputErrorClass, errorClass); 
            toggleButtonState(inputList, buttonElement, inactiveButtonClass); 
        })
        isValid(form, input, inputErrorClass, errorClass); 
    }); 
}


//управляет состоянием кнопки в зависимости от наличия невалидных input'ов
function toggleButtonState (inputList, buttonElement, inactiveButtonClass) { 
    if (hasInvalidInput(inputList)) { 
        buttonElement.classList.add(inactiveButtonClass); 
        buttonElement.disabled = true; 
    } else {    
        buttonElement.classList.remove(inactiveButtonClass); 
        buttonElement.disabled = false; 
    } 
    
    // проверка валидности поля
    function isValid (form, input, inputErrorClass, errorClass) { 
        if (!input.validity.valid) { 
          // Если поле не валидно - показывает ошибку 
          showInputError(form, input, input.validationMessage, inputErrorClass, errorClass); 
        } else { 
          // Если валидно - скроем 
          hideInputError(form, input, inputErrorClass, errorClass); 
        } 
    }
}


//функция возвращает любой невалидный input
function hasInvalidInput (inputList) { 
    return inputList.some((inputElement) => { 
        return !inputElement.validity.valid; 
    }) 
}


//показ ошибки 
function showInputError (form, input, errorMessage, inputErrorClass, errorClass) { 
    const formError = form.querySelector(`#${input.id}-error`); 
    input.classList.add(inputErrorClass); 
    formError.textContent = errorMessage; 
    formError.classList.add(errorClass); 
} 


//скрытие ошибки 
function hideInputError (form, input, inputErrorClass, errorClass) { 
    //выбор ошибки по id в шаблонную строку
    const formError = form.querySelector(`#${input.id}-error`); 
    input.classList.remove(inputErrorClass); 
    formError.classList.remove(errorClass); 
    formError.textContent = ''; 
}