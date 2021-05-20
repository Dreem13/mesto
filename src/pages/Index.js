import Card from '../components/Сard.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import {
  cardsContainer,
  userName,
  userJob,
  modalWindowEdit,
  modalWindowCards,
  inputName,
  inputCaption,
  valueName,
  valueJob,
  modalWindowImage,
  openEditProfilePopupBtn,
  openModalAddCardsButton,
  initialCards,
  formElementProfile,
  formAddCard,
  params,
} from '../utils/constants.js';

//получение инпутов
const userInfo = new UserInfo({name: userName, info: userJob});

// функция передачи данных профиля
const renderer = function (data) {
   userInfo.setUserInfo(data);
   popupEdit.close();
 }

// попап профиля
const popupEdit = new PopupWithForm ('.popup_type_edit', renderer);
popupEdit.setEventListeners();

//попап добавления карточек
const popupAdd = new PopupWithForm ('.popup_type_cards', submitHandlerCard);
popupAdd.setEventListeners();

// открыть превью
const popupImage = new PopupWithImage ('.popup_type_image');
function handleCardClick(data) {
  popupImage.open(data);
}
popupImage.setEventListeners();

// создание карточки
const createCard = (item) => {
  const card = new Card(item, '#card-template', handleCardClick);
  const cardElementNew = card.renderCard();
  return cardElementNew;
}

// добавление карточек
const renderCard = new Section ({
  items: initialCards,
  renderer: (items) => {
    items.reverse().forEach(item => {
      const cardElement = createCard(item);
      return renderCard.addItem(cardElement);
    })
  }
}, '.elements'
);
renderCard.getElement();

//
function submitHandlerCard (values) {
  const renderCard = new Section ({
    items: values,
    renderer: (items) => {
        const cardElement = createCard(items);
        return renderCard.addItem(cardElement);
    }
  }, '.elements'
  );
  return renderCard.getElement();
}

// открытие попапа профиля
openEditProfilePopupBtn.addEventListener('click', () => {
  valueName.value = userInfo.getUserInfo().name;
  valueJob.value = userInfo.getUserInfo().info;
  popupEdit.open();
  formElementProfile.reset();
  editFormValidator.resetFormState();
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
