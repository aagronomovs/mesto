// Новые карточки
const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
  ];
  
  // Делаем выборку DOM элементов
  const popupEditButtonElement = document.querySelector(".button_edit");
  const popupEditProfile = document.querySelector(".popup_edit-profile");
  const popupCloseProfile = popupEditProfile.querySelector(
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
  const popupCloseAddCard = document.querySelector(".popup__close_card");
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
  const popupSubmitNewCard = document.querySelector(".popup__submit_add-card");
  
  const popupZoomImage = document.querySelector(".popup_zoom-image");
  const popupImagePreview = document.querySelector(".popup__image-preview");
  const imageCloseButtonElement = document.querySelector(".popup__close_image");
  const popupImageTitle = document.querySelector(".popup__image-title");
  
  // Функция открытия попапов
  function openPopup(popup) {
    popup.classList.add("popup_opened");
  }
  
  // Функция закрытия попапов
  function closePopup(popup) {
    popup.classList.remove("popup_opened");
    formAddCardElement.reset();
  }
  
  // Открыть попап добавления карточки
  popupAddButtonElement.addEventListener("click", function (evt) {
    openPopup(popupAddNewCard);
  });
  
  // Закрыть попап добавления карточки
  popupCloseAddCard.addEventListener("click", function (evt) {
    closePopup(popupAddNewCard);
  });
  
  // Добавление карточки по темплейту
  
  function renderCard(item) {
    const cardElement = cardTemplate.querySelector(".item").cloneNode(true);
  
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
  
    cardElement
      .querySelector(".item__photo")
      .addEventListener("click", function (evt) {
        popupImagePreview.src = item.link;
        popupImagePreview.alt = item.name;
        popupImageTitle.textContent = item.name;
  
        openPopup(popupZoomImage);
      });
  
    imageCloseButtonElement.addEventListener("click", function (evt) {
      closePopup(popupZoomImage);
    });
  
    cardElement.querySelector(".item__title").textContent = item.name;
    cardElement.querySelector(".item__photo").src = item.link;
    cardElement.querySelector(".item__photo").alt = item.name;
  
    return cardElement;
  }
  
  function addCard(card) {
    const cardElement = renderCard(card);
    cardsContainer.prepend(cardElement);
  }
  
  //Добавление начальных карточек из массива
  initialCards.forEach(function (item) {
    addCard(item);
  });
  
  // Обработчик submit формы добавления карты
  
  function addFormSubmitHandler(evt) {
    evt.preventDefault();
    let card = new Object();
    //let form = document.forms.card;
    card.name = cardNameInput.value;
    card.link = cardLinkInput.value;
    addCard(card);
  
    closePopup(popupAddNewCard);
  }
  
  // Функция для попапа редактирования профиля
  popupEditButtonElement.addEventListener("click", function (evt) {
    nameInput.value = titleProfile.textContent;
    jobInput.value = infoProfile.textContent;
  
    openPopup(popupEditProfile);
  });
  
  popupCloseProfile.addEventListener("click", function (evt) {
    closePopup(popupEditProfile);
  });
  
  // Обработчик «отправки» формы редактирования профиля
  
  function editFormSubmitHandler(evt) {
    evt.preventDefault();
    titleProfile.textContent = nameInput.value;
    infoProfile.textContent = jobInput.value;
  
    closePopup(popupEditProfile);
  }
  
  formEditProfileElement.addEventListener("submit", editFormSubmitHandler);
  formAddCardElement.addEventListener("submit", addFormSubmitHandler);
  