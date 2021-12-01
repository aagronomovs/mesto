import {
    Popup
} from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, handleConfirmationSubmit) {
        super(popupSelector);
        this._form = this._popup.querySelector(".popup__form");
        this._handleConfirmationSubmit = handleConfirmationSubmit;
    }

    open(cardId, cardDelete) {
        super.open();
        this._cardId = cardId;
        this._cardDelete = cardDelete;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", (evt) => {

            evt.preventDefault();
            this._handleConfirmationSubmit(this._cardId, this._cardDelete);
        });
    }
}