import { Popup } from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._form = this._popup.querySelector(".popup__form");
        this.handleFormSubmit = handleFormSubmit;
        this._inputList = this._form.querySelectorAll(".popup__input");
    }

    _getInputValues() {
        this.inputValues = {};
        this._inputList.forEach(input => {
            this._inputValues[input.name] = input.value;
        } );

        return this.inputValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this.handleFormSubmit(this._getInputValues());
        });
    }

    close() {
        super.close();
        this._form.reset();
    }
}