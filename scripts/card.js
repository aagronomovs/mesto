export default class Card {
    constructor(data, cardSelector, handleLikeButton, handleDeleteButton, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;

        this._handleLikeButton = handleLikeButton;
        this._handleDeleteButton = handleDeleteButton;
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

    //Устанавливаем слушатели
    _setEventListeners() {
        this._likeButton.addEventListener("click", this._handleLikeButton);

        this._deleteButton.addEventListener("click", this._handleDeleteButton);

    }

    //Лайки
    _handleLikeButton() {
        this._likeButton.classList.toggle("button_like_active");
    }

    //Удалить карточку
    _handleDeleteButton() {
        this._deleteButton.classList.remove();

    }

    //Клик по картинке ????
    _handleCardClick() {
        this._renderImgPopup({
            link: this._link,
            name: this._name,
        });
    }


    //Создаем карточку
    generateCard() {
        this._element = this._getTemplate();

        this._likeButton = this._element.querySelector(".button_like");
        this._deleteButton = this._element.querySelector(".button_delete");
        this._setEventListeners();


        this._element.querySelector(".item__title").textContent = this._name;
        this._element.querySelector(".item__photo").src = this._link;
        this._element.querySelector(".item__photo").alt = this._name;

        return this._element;
    }
}