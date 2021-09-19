import { handleCardClick } from "./index.js";

export default class Card {
    constructor(data, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
    }

    //Создаем шаблон
    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector(".item")
            .cloneNode(true);

        return cardElement;
    }

    //Лайки
    _handleLikeButton(evt) {
        evt.target.classList.toggle("button_like_active");
        //this._element.querySelector(".button_like").classList.toggle("button_like_active");

    }

    //Удалить карточку
    _handleDeleteButton(evt) {
        evt.target.closest(".item").remove();
        //this._element.remove();
    }


    //Устанавливаем слушатели
    _setEventListeners() {
        this._element.querySelector(".button_like").addEventListener("click", this._handleLikeButton);
        this._element.querySelector(".button_delete").addEventListener("click", this._handleDeleteButton);
        this._element.querySelector(".item__photo").addEventListener("click", handleCardClick);
    }

    //Создаем карточку
    generateCard() {
        this._element = this._getTemplate();

        this._element.querySelector(".item__title").textContent = this._name;
        this._element.querySelector(".item__photo").src = this._link;
        this._element.querySelector(".item__photo").alt = this._name;

        this._setEventListeners();
        return this._element;
    }
}