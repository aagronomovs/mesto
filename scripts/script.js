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
const popupEditButtonElement = document.querySelector('.button_edit');
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_field_name');
let jobInput = formElement.querySelector('.popup__input_field_job');
let title = document.querySelector('.profile__title');
let info = document.querySelector('.profile__text');

const cardsContainer = document.querySelector('.cards');
const popupAddButtonElement = document.querySelector('.button_add');
const popupCloseAddCard = document.querySelector('.popup__close_card');
const formAddCardElement = document.querySelector('.popup__form_add-card');
const cardNameInput = formAddCardElement.querySelector('.popup__input_field_card-name');
const cardLink = formAddCardElement.querySelector('.popup__input_field_link');
const cardName = document.querySelector('.item__title');
const src = document.querySelector('.item__photo');

const cardTemplate = document.querySelector('#template').content;
const addNewCard = document.querySelector('.popup_add-card');
const submitNewCard = document.querySelector('.popup__submit_add-card');

const zoomImage = document.querySelector('.popup_zoom-image');
const imageClick = document.querySelector('.popup__image-preview');
const imageCloseButtonElement = document.querySelector('.popup__close_image');
const imageTitle = document.querySelector('.popup__image-title');


// Добавление карточек из массива

function renderCards (name, link) {
    const cardElement = cardTemplate.querySelector('.item').cloneNode(true);
        
    cardElement.querySelector('.item__title').textContent = name;
    cardElement.querySelector('.item__photo').src = link; 

    const likeActive = cardElement.querySelector('.button_like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('button_like_active');
    });

    const deleteCard = cardElement.querySelector('.button_delete').addEventListener('click', function (evt) {
        evt.target.closest('.item').remove();
    });

    cardElement.querySelector('.item__photo').addEventListener('click', function (openImagePopup) {
        zoomImage.classList.add('popup_opened'); 
        imageClick.src = link;
        imageTitle.textContent = name;
    });
    imageCloseButtonElement.addEventListener('click', function (closeImagePopup) {
        zoomImage.classList.remove('popup_opened');
    });
    
    cardsContainer.prepend(cardElement);
};

function addCard() {
for (let i = 0; i < initialCards.length; i++) {
    const data = initialCards[i];
    const name = data.name;
    const link = data.link;
    renderCards(name, link);
};
}
addCard();

// Открытие попапа для добавления новой карточки

function openAddPopup() {
   addNewCard.classList.add('popup_opened');
  
}

// Закрытие попапа добавления новой карточки
function closeAddPopup() {
   addNewCard.classList.remove('popup_opened'); 
   formAddCardElement.name.value = '';
   formAddCardElement.link.value = '';
 }; 


// Обработчик submit формы добавления карты

function addFormSubmitHandler(evt) {
    evt.preventDefault();

    let form = document.forms.card;
    let name = form.name.value;
	let link = form.link.value;
    renderCards(name, link);

    closeAddPopup();
}

// Открытие попапа с картинкой



// Функция для переключения попапа редактирования профиля
 
const openPopup = function () {
    popupElement.classList.add('popup_opened');
    nameInput.value = title.textContent;
    jobInput.value = info.textContent;
}

const closePopup = function () {
    popupElement.classList.remove('popup_opened')
}

// Обработчик «отправки» формы редактирования профиля

function formSubmitHandler(evt) {
    evt.preventDefault();
    title.textContent = nameInput.value;
    info.textContent = jobInput.value;
    
    closePopup();
} 

// Прикрепляем обработчик к форме:

popupEditButtonElement.addEventListener('click', openPopup);
popupAddButtonElement.addEventListener('click', openAddPopup);
popupCloseButtonElement.addEventListener('click', closePopup);

 
popupCloseAddCard.addEventListener('click', closeAddPopup);
formElement.addEventListener('submit', formSubmitHandler);
formAddCardElement.addEventListener('submit', addFormSubmitHandler);

