import "./index.css";
import {
  initialCards
} from "../utils/initial-cards.js";
import {
  dataForm,
  popupEditButtonElement,
  popupEditProfile,
  formElementProfile,
  formEditProfileElement,
  formAddCardElement,
  nameInput,
  jobInput,
  titleProfile,
  infoProfile,
  cardsContainer,
  popupAddButtonElement,
  cardNameInput,
  cardLinkInput,
  popupAddNewCard,
  formElementCard,
  popupZoomImage
} from "../utils/constants.js";
//import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

//const api = new Api( {
//  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-30',
//  headers: {
//    authorization: '35a287b1-80fa-4f60-8717-4407e47f6cbb',
//    'Content-Type': 'application/json',
//  },
//}); 

//--------------------------------------------------------------------------------------
// Форма добавления карточки
//--------------------------------------------------------------------------------------
const formValidatorCard = new FormValidator(dataForm, formElementCard);

//попап превью картинки
const imagePopup = new PopupWithImage(popupZoomImage);

function handleCardClick(name, link) {
  imagePopup.open(name, link);
}

//контейнер с карточками
const cardList = new Section({
  items: initialCards,
  renderer: (item) => renderCard(item),
}, cardsContainer);
cardList.renderItems();

function createCard(item) {
  const card = new Card(item, ".card-template_type_default", handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

function renderCard(item) {
  const newCard = createCard(item);
  cardsContainer.prepend(newCard);
}

const addCardPopup = new PopupWithForm(
  popupAddNewCard,
  (data) => {
    const cardObj = {}
    cardObj.name = data.cardName;
    cardObj.link = data.cardLink;
    const cardElement = createCard({
      name: cardNameInput.value,
      link: cardLinkInput.value
    });
    cardList.addItem(cardElement);
    addCardPopup.close();
  });

//--------------------------------------------------------------------------------------
// Форма редактирования профиля
//--------------------------------------------------------------------------------------
const formValidatorProfile = new FormValidator(dataForm, formElementProfile);

const userInfo = new UserInfo({
  titleProfile: titleProfile,
  infoProfile: infoProfile
});

function setProfilePopup() {
  const user = userInfo.getUserInfo();
  nameInput.value = user.title;
  jobInput.value = user.info;
}

const profilePopup = new PopupWithForm(popupEditProfile,
  (data) => {
    userInfo.setUserInfo(data);
    profilePopup.close()
  }
);

// Открыть попап редактирования профиля
popupEditButtonElement.addEventListener("click", () => {
  setProfilePopup();
  formValidatorProfile.clearValidation();
  profilePopup.open();
});


// Открыть попап добавления карточки
popupAddButtonElement.addEventListener("click", () => {
  formValidatorCard.clearValidation();
  addCardPopup.open();
});


//Валидация
formValidatorCard.enableValidation();
formValidatorProfile.enableValidation();

//"Слушатели"
imagePopup.setEventListeners();
profilePopup.setEventListeners();
addCardPopup.setEventListeners();