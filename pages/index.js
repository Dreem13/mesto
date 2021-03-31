const popup = document.querySelector('.popup');
const popupOpen = document.querySelector('.profile__info-text-button');
const popupClose = document.querySelector('.popup__close');
const userName = document.querySelector('.profile__title');
const userJob = document.querySelector('.profile__subtitle');
const valueName = document.querySelector('.popup__input_field_name');
const valueJob = document.querySelector('.popup__input_field_caption');

function clickOpen() {
    popup.classList.add('popup_open');
    valueName.value = userName.textContent;
    valueJob.value = userJob.textContent;
}
popupOpen.addEventListener('click', clickOpen);

function clickClose() {
    popup.classList.remove('popup_open');
}
popupClose.addEventListener('click', clickClose);

const formElement = document.querySelector('.popup__form');

function formSubmitHandler(evt) {
    evt.preventDefault();
    userName.textContent = valueName.value;
    userJob.textContent = valueJob.value;
    clickClose();
}
formElement.addEventListener('submit', formSubmitHandler);


// Массив с картинками
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

// Контейнер для карточек
const cardsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card-template').content;

// Функция для лайков
function toggleLike (likeElement) {
  likeElement.classList.toggle('elements__like-button_active');
}

// Создание элемента (карточки)
function createCard (cardData) {

  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.elements__title').textContent = cardData.name;
  cardElement.querySelector('.elements__image').src = cardData.link;

  const elementLike = cardElement.querySelector('.elements__like-button');
  elementLike.addEventListener('click', function () {
  toggleLike(elementLike);
  });

  const deleteButton = cardElement.querySelector('.elements__remove-button');
  deleteButton.addEventListener('click', deleteCard);

  const openModalImage = cardElement.querySelector('.elements__image');
  openModalImage.alt = cardData.name;
  openModalImage.src = cardData.link;

  openModalImage.addEventListener('click', function () {
  openPopupImage(cardData);
  });

  return cardElement;
}

// Перебор массива
initialCards.forEach(function (initialCard) {
const cardElement = createCard(initialCard);
cardsContainer.append(cardElement);
});

// Создание новой карточки
const cardSaveBtn = document.querySelector('.popup__btn_save');
function formSubmitCards (evt) {
  evt.preventDefault();
  const inputName = document.querySelector('.popup__input_card_name');
  const inputCaption = document.querySelector('.popup__input_card_caption');
  const cardItem = createCard ({name: inputName.value, link: inputCaption.value});
  cardsContainer.prepend(cardItem);
  closeModalWindowCards();
}
cardSaveBtn.addEventListener('click', formSubmitCards);

// Удаление карточки
function deleteCard (evt) {
  evt.target.closest('.elements__card').remove();
}

// Открытие/Закрытие попапов
const modalWindowEdit = document.querySelector('.popup_type_edit');
const modalWindowCards = document.querySelector('.popup_type_cards');
const modalWindowImage = document.querySelector('.popup_type_image');

const openModalAddCardsButton = document.querySelector('.profile__button');
const closeModalAddCardsButton = document.querySelector('.popup__close_cards');
const openModalImage = document.querySelector('.elements__image');
const closeModalImage = document.querySelector('.popup__close_image');

function openModalWindowCards () {
    modalWindowCards.classList.add('popup_open');
}
openModalAddCardsButton.addEventListener('click', openModalWindowCards);

function closeModalWindowCards () {
    modalWindowCards.classList.remove('popup_open');
}
closeModalAddCardsButton.addEventListener('click', closeModalWindowCards);

function openModalWindowImage () {
  modalWindowImage.classList.add('popup_open');
}
openModalImage.addEventListener('click', openModalWindowImage);

function closeModalWindowImage () {
    modalWindowImage.classList.remove('popup_open');
}
closeModalImage.addEventListener('click', closeModalWindowImage);

// Зум картинок
const popupCaption = document.querySelector('.popup__caption');
const popupImageZoom = document.querySelector('.popup__image');

function openPopupImage (data) {
  popupCaption.textContent = data.name;
  popupImageZoom.src = data.link;
  popupImageZoom.alt = data.name;

  openModalWindowImage(data);
}

