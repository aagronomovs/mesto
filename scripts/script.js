// Делаем выборку DOM элементов
const popupOpenButtonElement = document.querySelector('.button_edit');
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_name');
let jobInput = formElement.querySelector('.popup__input_job');
let title = document.querySelector('.profile__title');
let info = document.querySelector('.profile__text');

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