export default class Card {
    constructor( {data, handleCardClick, handleLikeClick, handleDeleteLike, handleDeleteCard}, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._currentUserId = data.currentUserId;
        this._id = data._id;
        this._userId = data.owner._id;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._handleDeleteLike = handleDeleteLike;
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

    //Переключение лайков
   // handleLikeButton(evt) {
    //    evt.target.classList.toggle("button_like_active");
    //}



    //Удалить карточку
    _handleDeleteCard(evt) {
        evt.target.closest(".item").remove();
    }

    //Убрать кнопку delete с чужих карточек
    // _hideDeleteButton() {
    //    if (this._currentUserId !== this._userId) {
    //       this._deleteButton.hidden = true;
    //  }
    // }

    //Создаем карточку
    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector(".item__photo");
        this._cardLike = this._element.querySelector(".button_like");
        this._updateLikes();
        this._likeCounter = this._element.querySelector(".item__like-counter");
        this._deleteButton = this._element.querySelector(".button_delete");
       
        this._element.querySelector(".item__title").textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._likeCounter.textContent = this._likes.length;

        this._setEventListeners();
        //_hideDeleteButton();
        return this._element;
    }

    //Устанавливаем слушатели
    _setEventListeners() {
        this._cardLike.addEventListener("click", () => this._handleLikeClick(this));
        this._deleteButton.addEventListener("click", this._handleDeleteCard);
        this._cardImage.addEventListener("click", () => 
            this._handleCardClick(this._name, this._link));
    }

    isLiked() {
        return this._likes.some(user => user._id === this.currentUserId)
    }

    //Постановка лайков
    setLikes(dataLikes) {
        this._likes = dataLikes;
        this._updateLikes();
    }

    _updateLikes() {
        if (!this.isLiked()) {
            this._cardLike.classList.remove("button_like_active"); 
        } else {
            this._cardLike.classList.add("button_like_active");
        }
    }

   
    // Показываем счетчик лайков
    // showLikeCounter(arr) {
    //    this._likeCounter.textContent = arr.length;
    // }
}