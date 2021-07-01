console.log('Hello world!')

// Делаем выборку DOM элементов
const popupOpenButtonElement = document.querySelector('.button__edit')
const popupElement = document.querySelector('.popup')
const popupCloseButtonElement = popupElement.querySelector('.popup__close')
console.log(popupOpenButtonElement, popupElement, popupCloseButtonElement)

/**
 * Функция для переключения попапа
 */

const togglePopupVisibility = function() {
    popupElement.classList.toggle('.popup_opened')
}

