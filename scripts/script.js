// Делаем выборку DOM элементов
const popup = document.querySelector(".popup");
const allPopups = document.querySelectorAll(".popup");
const popupContainers = document.querySelectorAll(".popup__container");
const formElement = document.querySelector(".popup__form");

const popupEditButtonElement = document.querySelector(".button_edit");
const popupEditProfile = document.querySelector(".popup_edit-profile");
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
const cardName = document.querySelector(".item__title");
const cardLink = document.querySelector(".item__photo");
const cardTemplate = document.querySelector("#template").content;
const popupAddNewCard = document.querySelector(".popup_add-card");
const popupSubmitButtonAddCard = document.querySelector(".popup__submit_add-card");

const popupZoomImage = document.querySelector(".popup_zoom-image");
const popupImagePreview = document.querySelector(".popup__image-preview");
const imageCloseButtonElement = document.querySelector(".popup__close_image");
const popupImageTitle = document.querySelector(".popup__image-title");
const popupImageContainer = document.querySelector(".popup__big");

// Функция открытия попапов
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByEscape);
  //document.addEventListener("click", closePopupbyClickOnOverlay);
}

// Функция закрытия попапов
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByEscape);
  //document.removeEventListener("click", closePopupbyClickOnOverlay);
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
const closePopupByEscape = function (evt, popup) {
  const popupOpened = document.querySelector(".popup_opened");
  if (evt.key === "Escape") {
    if (popupOpened) {
      closePopup(popupOpened);
    }
  }
}

// Добавление карточки по темплейту
function createCard(item) {
  const cardElement = cardTemplate.querySelector(".item").cloneNode(true);
  const cardElementPhoto = cardElement.querySelector(".item__photo");

  cardElement
    .querySelector(".button_like")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("button_like_active");
    });

  cardElement
    .querySelector(".button_delete")
    .addEventListener("click", function (evt) {
      evt.target.closest(".item").remove();
    });

  cardElementPhoto
    .addEventListener("click", function (evt) {
      popupImagePreview.src = item.link;
      popupImagePreview.alt = item.name;
      popupImageTitle.textContent = item.name;

      openPopup(popupZoomImage);
    });

  cardElement.querySelector(".item__title").textContent = item.name;
  cardElementPhoto.src = item.link;
  cardElementPhoto.alt = item.name;

  return cardElement;
}

function addCard(card) {
  const cardElement = createCard(card);
  cardsContainer.prepend(cardElement);
}

//Добавление начальных карточек из массива
initialCards.forEach(function (item) {
  addCard(item);
});

// Обработчик submit формы добавления карты
function addFormSubmitHandler(evt) {
  evt.preventDefault();
  const card = new Object();
  card.name = cardNameInput.value;
  card.link = cardLinkInput.value;

  addCard(card);
  formAddCardElement.reset();

  popupAddNewCard.querySelector(".popup__submit").classList.add("popup__submit_disabled");
  popupAddNewCard.querySelector(".popup__submit").setAttribute("disabled", true);

  closePopup(popupAddNewCard);
}


// Функция для попапа редактирования профиля
popupEditButtonElement.addEventListener("click", function (evt) {
  nameInput.value = titleProfile.textContent;
  jobInput.value = infoProfile.textContent;

  openPopup(popupEditProfile);
});

// Обработчик «отправки» формы редактирования профиля
function editFormSubmitHandler(evt) {
  evt.preventDefault();
  titleProfile.textContent = nameInput.value;
  infoProfile.textContent = jobInput.value;
  formEditProfileElement.reset();

  closePopup(popupEditProfile);
}

// Открыть попап добавления карточки
popupAddButtonElement.addEventListener("click", function (evt) {
  openPopup(popupAddNewCard);
});

// Закрыть попап добавления карточки
popupCloseButtonAddCard.addEventListener("click", function (evt) {
  closePopup(popupAddNewCard);
});
popupCloseButtonProfileElement.addEventListener("click", function (evt) {
  closePopup(popupEditProfile);
});
imageCloseButtonElement.addEventListener("click", function (evt) {
  closePopup(popupZoomImage);
});
formEditProfileElement.addEventListener("submit", editFormSubmitHandler);
formAddCardElement.addEventListener("submit", addFormSubmitHandler);
//formAddCardElement.addEventListener("input", addFormSubmitHandler);