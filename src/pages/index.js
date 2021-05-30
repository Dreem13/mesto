import './index.css';
import Card from '../components/Сard.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import {
    inputName,
    inputCaption,
    userName,
    userJob,
    valueName,
    valueJob,
    openEditProfilePopupBtn,
    openModalAddCardsButton,
    formElementProfile,
    formAddCard,
    params,
    initialCards,
} from '../utils/constants.js';

let currentUserId;

const api = new Api ({
url: 'https://mesto.nomoreparties.co/v1/cohort-24',
token: '8c6e6a0b-c97b-41fa-9ce9-e79b26e708e8'
});



// создание карточки
const createCard = (item) => {
  const card = new Card(item, '#card-template', handleCardClick, currentUserId);
  return card.renderCard();
}

// добавление карточек
const cardsSection = new Section({
  items: [],
  renderer: (items) => {

          const cardElement = createCard(items);
          cardsSection.addItem(cardElement);

  }
}, '.elements');
cardsSection.render();

//получение инпутов
const userInfo = new UserInfo({ name: '.profile__title', about: '.profile__subtitle'});


Promise.all([api.getUserInfo(), api.getCards()])
.then(
  ([userData, userCard]) => {
    currentUserId = userData._id;
    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about
  })
  const cardsSections = new Section({
    items: userCard,
    renderer: (items) => {
            const cardElement = createCard(items);
            cardsSections.addItem(cardElement);
    }
  }, '.elements');
  cardsSections.render();
})


// api.getUserInfo ()
// .then(
//   (res) => {
//       userInfo.setUserInfo({
//       name: res.name,
//       about: res.about
//     });
//   }
// )

// попап профиля
const popupEdit = new PopupWithForm('.popup_type_edit', editFormSubmitHandler);
popupEdit.setEventListeners();

function editFormSubmitHandler (dataFormPoup){
  api.setUserInfo({
    name: dataFormPoup.username,
    about: dataFormPoup.userjob
  }
  ).then((dataFormServer) =>{
    userInfo.setUserInfo(dataFormServer)
  })
}

// api.getCards ()
// .then( (res) => {
//   const cardsSections = new Section({
//   items: res,
//   renderer: (items) => {
//       items.reverse().forEach(item => {
//           const cardElement = createCard(item);
//           cardsSections.addItem(cardElement);
//           })
//   }
// }, '.elements');
// cardsSections.render();
// }
// )

// функция передачи данных профиля
// const editFormSubmitHandler = function(data) {
//     userInfo.setUserInfo(data);
//     popupEdit.close();
// }



//попап добавления карточек
const popupAdd = new PopupWithForm('.popup_type_cards', submitHandlerCard);
popupAdd.setEventListeners();

// открыть превью
const popupImage = new PopupWithImage('.popup_type_image');

function handleCardClick(data) {
    popupImage.open(data);
}
popupImage.setEventListeners();

function submitHandlerCard(values) {
      api.setNewCard({
          name:values.name,
          link:values.link
        }
        ).then((data) =>{
          cardsSection.addItem(createCard(data))
        })
}

// открытие попапа профиля
openEditProfilePopupBtn.addEventListener('click', () => {
    popupEdit.open();
    const userValues = userInfo.getUserInfo();
    valueName.value = userValues.name;
    valueJob.value = userValues.about;

    // editFormValidator.resetFormState();
});

// открытие попапа карточек
openModalAddCardsButton.addEventListener('click', () => {
    popupAdd.open();
    addCardValidator.resetFormState();
});

//Добавление валидации для форм
const addCardValidator = new FormValidator(params, formAddCard);
const editFormValidator = new FormValidator(params, formElementProfile);

addCardValidator.enableValidation();
editFormValidator.enableValidation();
