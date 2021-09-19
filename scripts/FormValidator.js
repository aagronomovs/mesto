export default class FormValidator {
    constructor(data, formElement) {
        this._form = formElement;
        this._inputSelector = data.inputSelector;
        this._submitButtonSelector = data.submitButtonSelector;
        this._inactiveButtonClass = data.inactiveButtonClass;
        this._inputErrorClass = data.inputErrorClass;
        this._errorClass = data.errorClass;
        this._inputList = Array.from(formElement.querySelectorAll(data.inputSelector));
        this._buttonElement = formElement.querySelector(data.submitButtonSelector);
    }


    //показать ошибку
    _showInputError(inputElement, errorMessage) {
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    };


    //Спрятать ошибку
    _hideInputError(inputElement) {
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    };


    //Проверить поле ввода на валидность
    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };

    //Наличие невалидных полей
    _hasInvalidInput() {
        return this._inputList.some((inputElement) => !inputElement.validity.valid);
    };

    //Очистить поля
    clearValidation() {
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
        this._disableSubmitButton();
        //this._form.reset();
    }


    //Отключение кнопки
    _disableSubmitButton() {
        this._buttonElement.classList.add(this._inactiveButtonClass);
        this._buttonElement.setAttribute('disabled', true);
    }


    //Включение кнопки
    _enableSubmitButton() {
        this._buttonElement.classList.remove(this._inactiveButtonClass);
        this._buttonElement.removeAttribute('disabled');
    }


    //Метод переключения кнопки
    _toggleButtonState() {
        if (this._hasInvalidInput(this._inputList)) {
            this._disableSubmitButton();
        } else {
            this._enableSubmitButton();
        }
    };


    //Слушатели
    _setEventListeners() {
        this._inputList.forEach((inputElement) => {
            //this._toggleButtonState();

            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    };

    //Валидация
    enableValidation() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
    };
}