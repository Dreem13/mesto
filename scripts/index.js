import { Card } from './Сard.js';
import { FormValidator } from './FormValidator.js';
import { initialCards } from './Initial-card.js';
import { clickOpen, clickClose } from './Utils/Utils.js';

const params = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__btn',
    inactiveButtonClass: 'popup__btn_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'error',
};

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

//Добавление валидации для форм
const addCardValidator = new FormValidator(params, formAddCard);
const editFormValidator = new FormValidator(params, formElementProfile);

addCardValidator.enableValidation();
editFormValidator.enableValidation();


// Создание карточки
function createCard({ name, link }) {
    const cardElement = new Card({ name, link }, '#card-template');
    return cardElement.renderCard();
}

//Перебор массива
initialCards.forEach(function(initialCard) {
    cardsContainer.append(createCard(initialCard));
});

function submitAddCardForm(evt) {
    evt.preventDefault();
    const cardItem = createCard({ name: inputName.value, link: inputCaption.value });
    cardsContainer.prepend(cardItem);
    clickClose(modalWindowCards);
}

// Открытие/Закрытие попапов
openModalAddCardsButton.addEventListener('click', function() {
    clickOpen(modalWindowCards);
    addCardValidator.resetFormState();
    formAddCard.reset();
});

closeModalAddCardsButton.addEventListener('click', function() {
    clickClose(modalWindowCards);

});

closeModalImage.addEventListener('click', function() {
    clickClose(modalWindowImage);
});

// Закрытие попапов по клику на оверлей
// Профиль
modalWindowEdit.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup__overlay')) {
        clickClose(modalWindowEdit);
    }
});

// Добавление карточек
modalWindowCards.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup__overlay')) {
        clickClose(modalWindowCards);
    }
});

// Зум картинок
modalWindowImage.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup__overlay')) {
        clickClose(modalWindowImage);
    }
});

openEditProfilePopupBtn.addEventListener('click', function() {
    clickOpen(modalWindowEdit);
    formElementProfile.reset();
    valueName.value = userName.textContent;
    valueJob.value = userJob.textContent;
    editFormValidator.resetFormState();
});

closeEditProfilePopupBtn.addEventListener('click', function() {
    clickClose(modalWindowEdit);
});

modalWindowCards.addEventListener('submit', submitAddCardForm);

formElementProfile.addEventListener('submit', function(evt) {
    evt.preventDefault();
    userName.textContent = valueName.value;
    userJob.textContent = valueJob.value;
    clickClose(modalWindowEdit);
});
