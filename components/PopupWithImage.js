import { Popup } from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._image = this._popup.querySelector(".popup__image-preview");
        this._imageTitle = this._popup.querySelector(".popup__image-title");
    }

    open( {title, link} ) {
        this._image.setAttribute("src", link);
        this._image.setAttribute("alt", title);
        this._imageTitle.textContent = title;

        super.open();
    }
}