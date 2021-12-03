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
  avatarProfile,
  cardsContainer,
  popupAddButtonElement,
  cardNameInput,
  cardLinkInput,
  popupAddNewCard,
  formElementCard,
  popupZoomImage,
  popupUpdateAvatar,
  buttonSubmit,
  buttonAvatarSubmit,
  profileAvatarEditElement,
  formElementAvatar,
  buttonProfileSubmit,
  formElementDelete,
  popupConfirmation,
  buttonAddCardSubmit
} from "../utils/constants.js";
import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-30',
  headers: {
    authorization: '35a287b1-80fa-4f60-8717-4407e47f6cbb',
    'Content-Type': 'application/json',
  },
});

let userId = null;

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([dataUser, dataCards]) => {
    userId = dataUser._id;
    userInfo.setUserInfo(dataUser);
    cardList.renderItems(dataCards);
  })
  .catch((err) => {
    console.log(err);
  });



//--------------------------------------------------------------------------------------
// Форма добавления карточки
//--------------------------------------------------------------------------------------
const formValidatorCard = new FormValidator(dataForm, formElementCard);

//попап превью картинки
const imagePopup = new PopupWithImage(popupZoomImage);

//попап удаления карточки
const deletePopup = new PopupWithConfirmation(popupConfirmation);
deletePopup.setEventListeners();

//контейнер с карточками
const cardList = new Section({
    // items: initialCards,
    renderer: (items) => {
      const element = createCard(items);
      cardList.addItem(element)
    }
  },
  cardsContainer);
//cardList.renderItems();

function createCard(data) {
  const card = new Card({
      data: {
        ...data,
        currentUserId: userId
      },
      handleCardClick: () => {

        imagePopup.open(data);
      },
      handleLikeClick: (card) => {
        if (card.isLiked()) {
          api.removeLike(card._id)
            .then(dataCards => card.setLikes(dataCards.likes))
        } else {
          api.getLike(card._id)
            .then(dataCards => card.setLikes(dataCards.likes))
        }
      },
      handleDeleteCard: (card) => {
        deletePopup.open();
        deletePopup.setActionSubmit(() => {
          api
              .deleteCard(card._id)
              .then(() => {
                card.deleteCard();
                deletePopup.close();
              })
        })
        
      },
    },
    ".card-template_type_default");

  const cardElement = card.generateCard();
  return cardElement;
}


//const addCardPopup = new PopupWithForm(
// popupAddNewCard,
// (data) => {
// const cardObj = {}
// cardObj.name = data.cardName;
// cardObj.link = data.cardLink;
//const cardElement = createCard({
//  name: cardNameInput.value,
//  link: cardLinkInput.value
//});
//cardList.addItem(cardElement);
//addCardPopup.close();
//});


//попап добавления карточки
const addCardPopup = new PopupWithForm(
  popupAddNewCard, {
    handleFormSubmit: (data) => {
      const cardObj = {}
      cardObj.name = data.cardName;
      cardObj.link = data.cardLink;
      api
        .postNewCard(cardObj.name, cardObj.link)
        .then((res) => {
          const card = createCard(res);
          cardList.addItem(card);
          addCardPopup.close();
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          buttonAddCardSubmit.textContent = "Создать";
        })
      
      addCardPopup.close();
    }
  });

//--------------------------------------------------------------------------------------
// Форма редактирования профиля
//--------------------------------------------------------------------------------------
const formValidatorProfile = new FormValidator(dataForm, formElementProfile);

const userInfo = new UserInfo({
  titleProfile: titleProfile,
  infoProfile: infoProfile,
  avatarProfile: avatarProfile
});

function setProfilePopup() {
  const user = userInfo.getUserInfo();
  nameInput.value = user.name;
  jobInput.value = user.about;
}

const profilePopup = new PopupWithForm(
  popupEditProfile, {
    handleFormSubmit: (data) => {
      api.updateUserInfo(data.name, data.about)
        .then((res) => {
          userInfo.setUserInfo(res);
          profilePopup.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          buttonProfileSubmit.textContent = "Сохранить";
        })
    }
  });


// Открыть попап редактирования профиля
popupEditButtonElement.addEventListener("click", () => {
  setProfilePopup();
  formValidatorProfile.clearValidation();
  profilePopup.open();
});

//------------------------------------------------------------------------------------
// Форма изменения аватара пользователя
//------------------------------------------------------------------------------------
const formValidatorAvatar = new FormValidator(dataForm, formElementAvatar);

const popupAvatar = new PopupWithForm(popupUpdateAvatar, {
  handleFormSubmit: (data) => {
    const avatar = {};
    avatar.link = data.link;
    api.updateAvatar(data.link)
      .then((res) => {
        userInfo.setUserInfo(res);
        popupAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        buttonAvatarSubmit.textContent = "Сохранить";
      })
  }
});

// Открыть попап изменения аватара
profileAvatarEditElement.addEventListener("click", () => {
  formValidatorAvatar.clearValidation();
  popupAvatar.open();
})


// Открыть попап добавления карточки
popupAddButtonElement.addEventListener("click", () => {
  formValidatorCard.clearValidation();
  addCardPopup.open();
});


//Валидация
formValidatorCard.enableValidation();
formValidatorProfile.enableValidation();
formValidatorAvatar.enableValidation();


//"Слушатели"
imagePopup.setEventListeners();
profilePopup.setEventListeners();
addCardPopup.setEventListeners();
popupAvatar.setEventListeners();