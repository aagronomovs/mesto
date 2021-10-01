import {
  initialCards
} from "../utils/initial-cards.js";
import {
  dataForm,
  listSelector
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";


// Делаем выборку DOM элементов
const popup = document.querySelector(".popup");
const allPopups = document.querySelectorAll(".popup");
const popupContainers = document.querySelectorAll(".popup__container");
//const formElement = document.querySelector(".popup__form");
//const submitButton = document.querySelector(".popup__submit");


const popupEditButtonElement = document.querySelector(".button_edit");
const popupEditProfile = document.querySelector(".popup_edit-profile");
const formElementProfile = document.forms.userform;
const popupCloseButtonProfileElement = popupEditProfile.querySelector(
  ".popup__close_profile"
);
const formEditProfileElement = document.querySelector(
  ".popup__form_edit-profile"
);
const nameInput = formEditProfileElement.querySelector(
  ".popup__input_field_name"
);
const jobInput = formEditProfileElement.querySelector(
  ".popup__input_field_job"
);
const titleProfile = document.querySelector(".profile__title");
const infoProfile = document.querySelector(".profile__text");

const cardsContainer = document.querySelector(".cards");
const popupAddButtonElement = document.querySelector(".button_add");
const popupCloseButtonAddCard = document.querySelector(".popup__close_card");
const formAddCardElement = document.querySelector(".popup__form_add-card");
const cardNameInput = formAddCardElement.querySelector(
  ".popup__input_field_card-name"
);
const cardLinkInput = formAddCardElement.querySelector(
  ".popup__input_field_link"
);
//const cardName = document.querySelector(".item__title");
//const cardLink = document.querySelector(".item__photo");
//const cardTemplate = document.querySelector("#template").content;
const popupAddNewCard = document.querySelector(".popup_add-card");
const formElementCard = document.forms.card;
const popupSubmitButtonAddCard = document.querySelector(".popup__submit_add-card");

//const submitButtonForEditProfilePopup = popupEditButtonElement.querySelector(".popup__submit");

const popupZoomImage = document.querySelector(".popup_zoom-image");
const popupImagePreview = document.querySelector(".popup__image-preview");
const imageCloseButtonElement = document.querySelector(".popup__close_image");
const popupImageTitle = document.querySelector(".popup__image-title");
const popupImageContainer = document.querySelector(".popup__big");

// Функция открытия попапов
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByEscape);
}

// Функция закрытия попапов
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByEscape);
}

//Функция закрытия попапов по оверлей 
function closePopupbyClickOnOverlay(evt) {
  closePopup(evt.target.closest('.popup'));
}

// Перебор всех попапов и навешивание слушателей
allPopups.forEach((popup) => {
  popup.addEventListener("click", closePopupbyClickOnOverlay);
});

// Перебор всех контейнеров с попапами, чтобы не дать закрыть контейнер по клику внутри
popupContainers.forEach((popupContainer) => {
  popupContainer.addEventListener("click", (evt) => {
    evt.stopPropagation();
  });
})

//Не даем закрыть контейнер с фото по клику внутри
popupImageContainer.addEventListener("click", (evt) => {
  evt.stopPropagation();
});


//Функция закрытия попапов по Escape
const closePopupByEscape = function (evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    if (popupOpened) {
      closePopup(popupOpened);
    }
  }
}


//--------------------------------------------------------------------------------------
// Форма добавления карточки
//--------------------------------------------------------------------------------------
const formValidatorCard = new FormValidator(dataForm, formElementCard);

//Создание карточки
function createCard(data) {
  return (new Card(data, ".card-template_type_default", handleCardClick)).generateCard();
}

//Добавление карточки
//function addCard(data) {
  //const cardElement = createCard(data);

  //cardsContainer.prepend(cardElement);
//}

//Добавление начальных карточек из массива (не работает почему-то)
const defaultCardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);
    defaultCardList.addItem(cardElement)
    
}, cardsContainer});
defaultCardList.renderItem();



//initialCards.forEach((item) => {
//  addCard(item);
//})


//Функция для просмотра попапа картинки
export function handleCardClick(evt) {
  openPopup(popupZoomImage);
  const link = evt.target.getAttribute("src");
  const title = evt.target.getAttribute("alt");
  popupImagePreview.src = link;
  popupImagePreview.alt = title;
  popupImageTitle.textContent = title;
}

// Обработчик submit формы добавления карты
function addFormSubmitHandler(evt) {
  evt.preventDefault();
  const newCard = {
    name: cardNameInput.value,
    link: cardLinkInput.value
  };

  //addCard(newCard);
  addItem(newCard);

  closePopup(popupAddNewCard);
  }


//--------------------------------------------------------------------------------------
// Форма редактирования профиля
//--------------------------------------------------------------------------------------
const formValidatorProfile = new FormValidator(dataForm, formElementProfile);

// Функция для попапа редактирования профиля
popupEditButtonElement.addEventListener("click", () => {
  nameInput.value = titleProfile.textContent;
  jobInput.value = infoProfile.textContent;
  formValidatorProfile.clearValidation();
  openPopup(popupEditProfile);
});

// Обработчик «отправки» формы редактирования профиля
function editFormSubmitHandler(evt) {
  evt.preventDefault();
  titleProfile.textContent = nameInput.value;
  infoProfile.textContent = jobInput.value;

  closePopup(popupEditProfile);
}


// Открыть попап добавления карточки
popupAddButtonElement.addEventListener("click", () => {
  openPopup(popupAddNewCard);
  formValidatorCard.clearValidation();
  formAddCardElement.reset();
});

// Закрыть попап добавления карточки
popupCloseButtonAddCard.addEventListener("click", () => {
  closePopup(popupAddNewCard);
});

//Закрыть попап профиля
popupCloseButtonProfileElement.addEventListener("click", () => {
  closePopup(popupEditProfile);
});

//Закрыть попап просмотра картинки
imageCloseButtonElement.addEventListener("click", () => {
  closePopup(popupZoomImage);
});

formEditProfileElement.addEventListener("submit", editFormSubmitHandler);
formAddCardElement.addEventListener("submit", addFormSubmitHandler);

//Валидация
formValidatorCard.enableValidation();
formValidatorProfile.enableValidation();