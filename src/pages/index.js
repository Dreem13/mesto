import './index.css';
import Card from '../components/Сard.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import popupConfirm from '../components/popupConfirm.js';
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
    popupAvatar,
    avatarButton,
    formAvatarElement,
    popupDelete,
    modalWindowEdit,
    modalWindowCards,
    modalWindowImage,
    profileAvatar,
    popupDeleteButton,
} from '../utils/constants.js';

let currentUserId;

const api = new Api ({
url: 'https://mesto.nomoreparties.co/v1/cohort-24',
token: '8c6e6a0b-c97b-41fa-9ce9-e79b26e708e8'
});

Promise.all([api.getUserInfo(), api.getCards()])
.then(
  ([userData, userCard]) => {
    currentUserId = userData._id;
    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
      avatar: userData.avatar
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

// создание карточки
const createCard = (item) => {
  const card = new Card(item, '#card-template', handleCardClick, currentUserId, submitCardDelete, likeCard,
            () => {
            (item.isLiked ?
                api.removeLike(item._id) :
                api.addLike(item._id))
            .then(res => {
                // card.toggleLike();
                // card.renewLikes(res.likes.length);
                item.isLiked = !item.isLiked;
            });
        }
    );
  return card.renderCard();
}

// функция для лайков
function likeCard (card, likes) {
  api.like(card.getId(), card.getIsLiked())
  .then(res => {
    card.updateLikesInfo(res.likes);
  })
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
const userInfo = new UserInfo({ name: '.profile__title', about: '.profile__subtitle', avatar: '.profile__info-img'});

// обновление аватара
const popupAvatarForm = new PopupWithForm (popupAvatar, handleAvatarFormSubmit);
popupAvatarForm.setEventListeners();

function handleAvatarFormSubmit(inputData) {
  popupAvatarForm.renderLoading(true);

  api.updateAvatar(inputData.avatar)
    .then((result) => {
      userInfo.setUserAvatar(result.avatar);
      popupAvatarForm.close();
    })
    .catch((err) => {
      console.log(err);
    })
}

// слушатель на кнопку обновления аватара
  avatarButton.addEventListener('click', () => {
  formAvatarValidator.resetFormState();
  formAvatarElement.reset();
  popupAvatarForm.open();
});

// удаление карточки
function submitCardDelete (data) {
  deleteCardConfirm.submitHandler(data);
  deleteCardConfirm.open();
}

// попап удаления карточки
const deleteCardConfirm = new popupConfirm (popupDelete, deleteCardSubmit);
deleteCardConfirm.setEventListeners();

// удаление карточки
function deleteCardSubmit (data) {
  return api.deleteCard(data.cardId)
  .then(() => {
    data._deleteCard();
    deleteCardConfirm.close();
  });
}

// попап профиля
const popupEdit = new PopupWithForm (modalWindowEdit, editFormSubmitHandler);
popupEdit.setEventListeners();

function editFormSubmitHandler (dataFormPoup){
  api.setUserInfo({
    name: dataFormPoup.username,
    about: dataFormPoup.userjob
  }
  ).then((dataFormServer) =>{
    userInfo.setUserInfo(dataFormServer)
  })
  .catch(() => {
    console.log('error')
  })
}

//попап добавления карточек
const popupAdd = new PopupWithForm (modalWindowCards, submitHandlerCard);
popupAdd.setEventListeners();

// открыть превью
const popupImage = new PopupWithImage (modalWindowImage, handleCardClick);

function handleCardClick(data) {
  popupImage.open(data);
}
popupImage.setEventListeners();

function submitHandlerCard(values) {
  popupAdd.showTextSave(true);
      api.setNewCard({
          name:values.name,
          link:values.link
        }
        ).then((data) =>{
          cardsSection.addItem(createCard(data))
        })
        .finally(() => {
          popupAdd.showTextSave(false);
        })
}

// открытие попапа профиля
openEditProfilePopupBtn.addEventListener('click', () => {
    popupEdit.open();
    const userValues = userInfo.getUserInfo();
    valueName.value = userValues.name;
    valueJob.value = userValues.about;
});

// открытие попапа карточек
openModalAddCardsButton.addEventListener('click', () => {
    popupAdd.open();
    addCardValidator.resetFormState();
});

//Добавление валидации для форм
const addCardValidator = new FormValidator(params, formAddCard);
const editFormValidator = new FormValidator(params, formElementProfile);
const formAvatarValidator = new FormValidator(params, formAvatarElement);

addCardValidator.enableValidation();
editFormValidator.enableValidation();
formAvatarValidator.enableValidation();
