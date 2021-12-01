import {
    Popup
} from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._image = this._popup.querySelector(".popup__image-preview");
        this._imageTitle = this._popup.querySelector(".popup__image-title");
    }

    open(data) {
        this._image.src = data.link;
        this._image.alt = data.name;
        this._imageTitle.textContent = data.name;

        super.open();
    }
}