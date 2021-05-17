const openEditProfilePopupBtn = document.querySelector('.profile__info-text-button');
const closeEditProfilePopupBtn = document.querySelector('.popup__close_edit');
const userName = document.querySelector('.profile__title');
const userJob = document.querySelector('.profile__subtitle');
const valueName = document.querySelector('.popup__input_field_name');
const valueJob = document.querySelector('.popup__input_field_caption');
const formElementProfile = document.querySelector('.popup__form-profile');
const cardsContainer = document.querySelector('.elements'); // Контейнер для карточек
const cardSaveBtn = document.querySelector('.popup__btn_save'); // Кнопка создания новой карточки
const modalWindowEdit = document.querySelector('.popup_type_edit');
const modalWindowCards = document.querySelector('.popup_type_cards');
const formAddCard = document.querySelector('.popup__form-cards');
const modalWindowImage = document.querySelector('.popup_type_image');
const openModalAddCardsButton = document.querySelector('.profile__button');
const closeModalAddCardsButton = document.querySelector('.popup__close_cards');
const closeModalImage = document.querySelector('.popup__close_image');
const inputName = document.querySelector('.popup__input_card_name');
const inputCaption = document.querySelector('.popup__input_card_caption');

const initialCards = [{
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

const params = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'error',
};

export {
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

}
