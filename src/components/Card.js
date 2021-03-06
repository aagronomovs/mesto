export default class Card {
    constructor({
        data,
        handleCardClick,
        handleLikeClick,
        handleDeleteCard
    }, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._likeCounter = data.likes.length;
        this._currentUserId = data.currentUserId;
        this._id = data._id;
        this._userId = data.owner._id;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._handleDeleteCard = handleDeleteCard;
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

    //Создаем карточку
    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector(".item__photo");
        this._cardLike = this._element.querySelector(".button_like");
        
        this._element.querySelector(".item__like-counter").textContent = this._likeCounter;
        this._deleteButton = this._element.querySelector(".button_delete");
        this._element.querySelector(".item__title").textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        //this._likeCounter.textContent = this._likes.length;
        //this.isLiked();
        this._updateLikes();
        this._setEventListeners();
       

        return this._element;
    }

    //Удалить карточку
    deleteCard = () => {
        this._element.remove();
        this._element = null;
    }

    //Убрать кнопку delete с чужих карточек
    _removeDeleteButton() {
        if (this._currentUserId !== this._userId) {
            this._deleteButton.remove();
        }
    }

    //Устанавливаем слушатели
    _setEventListeners() {
        this._cardLike.addEventListener("click", () => this._handleLikeClick(this));

        this._deleteButton.addEventListener("click", () => this._handleDeleteCard(this));
        this._removeDeleteButton(this);
        this._cardImage.addEventListener("click", () =>
            this._handleCardClick(this._name, this._link));
    }

    isLiked() {
        return this._likes.some(user => user._id === this._currentUserId)
    }

    //Постановка лайков
    setLikes(data) {
        this._likes = data;
        this._likeCounter = this._likes.length;
        this._element.querySelector(".item__like-counter").textContent = this._likeCounter;
        this._updateLikes();
    }

    _updateLikes() {
        if (!this.isLiked()) {
            this._cardLike.classList.remove("button_like_active");
        } else {
            this._cardLike.classList.add("button_like_active");
        }
    }

    //Переключение лайков
    // handleLikeButton(evt) {
    //    evt.target.classList.toggle("button_like_active");
    //}
}