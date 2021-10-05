import Popup from "./Popup";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._image = document.querySelector(".popup__image-preview");
        this._imageTitle = document.querySelector(".popup__image-title");
    }

    open(link, title) {
        this._image.setAttribute("src", link);
        this._image.setAttribute("alt", title);
        this._imageTitle.textContent = title;

        super.open();
    }
}