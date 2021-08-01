// Новые карточки
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

// Делаем выборку DOM элементов
const popupOpenButtonElement = document.querySelector('.button_edit');
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_field_name');
let jobInput = formElement.querySelector('.popup__input_field_job');
let title = document.querySelector('.profile__title');
let info = document.querySelector('.profile__text');
const cardsContainer = document.querySelector('.cards');


// Добавление карточек из массива
initialCards.forEach(function (element) {
    const cardTemplate = document.querySelector('#template').content;
    const cardElement = cardTemplate.querySelector('.item').cloneNode(true);
    cardElement.querySelector('.item__title').textContent = element.name;
    cardElement.querySelector('.item__photo').src = element.link;

    cardsContainer.append(cardElement);
})



/**
 * Функция для переключения попапа
 */
const openPopup = function () {
    popupElement.classList.add('popup_opened');
    nameInput.value = title.textContent;
    jobInput.value = info.textContent;
}

const closePopup = function () {
    popupElement.classList.remove('popup_opened')
}

// Обработчик «отправки» формы

function formSubmitHandler(evt) {
    evt.preventDefault();
    title.textContent = nameInput.value;
    info.textContent = jobInput.value;
    closePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);