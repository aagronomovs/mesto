export default class Card {
    constructor(data, cardSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
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


    }

    //Удалить карточку
    _handleDeleteButton(evt) {
        evt.target.closest(".item").remove();

    }

    //Создаем карточку
    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector(".item__photo");

        this._element.querySelector(".item__title").textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;

        this._setEventListeners();
        return this._element;
    }

    //Устанавливаем слушатели
    _setEventListeners() {
        this._element.querySelector(".button_like").addEventListener("click", this._handleLikeButton);
        this._element.querySelector(".button_delete").addEventListener("click", this._handleDeleteButton);
        this._cardImage.addEventListener("click", () => {
            this._handleCardClick(this._name, this._link)
        });
    }
}