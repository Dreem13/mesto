const popupEditProfile = document.querySelector('.popup'); 
const openEditProfilePopupBtn = document.querySelector('.profile__info-text-button');
const closeEditProfilePopupBtn = document.querySelector('.popup__close_edit');
const userName = document.querySelector('.profile__title');
const userJob = document.querySelector('.profile__subtitle');
const valueName = document.querySelector('.popup__input_field_name');
const valueJob = document.querySelector('.popup__input_field_caption');
const formElementCards = document.querySelector('.popup__form_type_cards');
const formElementProfile = document.querySelector('.popup__form_type_profile');
const popupEditSaveBtn = document.querySelector('.popup__btn');

// Контейнер для карточек
const cardsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card-template').content;

const cardSaveBtn = document.querySelector('.popup__btn_save'); // Кнопка создания новой карточки

const modalWindowEdit = document.querySelector('.popup_type_edit');
const modalWindowCards = document.querySelector('.popup_type_cards');
const modalWindowImage = document.querySelector('.popup_type_image');

const openModalAddCardsButton = document.querySelector('.profile__button');
const closeModalAddCardsButton = document.querySelector('.popup__close_cards');

const cardlImage = document.querySelector('.elements__image');
const closeModalImage = document.querySelector('.popup__close_image');

const popupCaption = document.querySelector('.popup__caption');
const popupImageZoom = document.querySelector('.popup__image');

const inputName = document.querySelector('.popup__input_card_name');
const inputCaption = document.querySelector('.popup__input_card_caption');

function clickOpen(popup) {
    popup.classList.add('popup_open');
}

function clickClose(popup) {
    popup.classList.remove('popup_open');
}

openEditProfilePopupBtn.addEventListener('click', function() {
    clickOpen(modalWindowEdit);
    valueName.value = userName.textContent;
    valueJob.value = userJob.textContent;
});

closeEditProfilePopupBtn.addEventListener('click', function() {
    clickClose(modalWindowEdit);
});

popupEditSaveBtn.addEventListener('click', function() {
    function submitEditProfileForm(evt) {
        evt.preventDefault();
        userName.textContent = valueName.value;
        userJob.textContent = valueJob.value;
        clickClose(modalWindowEdit);
    }
    formElementProfile.addEventListener('submit', submitEditProfileForm);
});

// Функция для лайков
function toggleLike(likeElement) {
    likeElement.classList.toggle('elements__like-button_active');
}

// Создание элемента (карточки)
function createCard(cardData) {

    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.elements__title').textContent = cardData.name;
    cardElement.querySelector('.elements__image').src = cardData.link;

    const elementLike = cardElement.querySelector('.elements__like-button');
    elementLike.addEventListener('click', function() {
        toggleLike(elementLike);
    });

    const deleteButton = cardElement.querySelector('.elements__remove-button');
    deleteButton.addEventListener('click', deleteCard);

    const openModalImage = cardElement.querySelector('.elements__image');
    openModalImage.alt = cardData.name;
    openModalImage.src = cardData.link;

    openModalImage.addEventListener('click', function() {
        openPopupImage(cardData);
    });
    return cardElement;
}

// Перебор массива
initialCards.forEach(function(initialCard) {
    const cardElements = createCard(initialCard);
    cardsContainer.append(cardElements);
});

cardSaveBtn.addEventListener('click', submitAddCardForm); // Создание новой карточки

function submitAddCardForm(evt) {
    evt.preventDefault();
    const cardItem = createCard({ name: inputName.value, link: inputCaption.value });
    cardsContainer.prepend(cardItem);
    formElementCards.reset();
    clickClose(modalWindowCards);
}

// Удаление карточки
function deleteCard(evt) {
    evt.target.closest('.elements__card').remove();
}

// Открытие/Закрытие попапов
openModalAddCardsButton.addEventListener('click', function() {
    clickOpen(modalWindowCards);
});

closeModalAddCardsButton.addEventListener('click', function() {
    clickClose(modalWindowCards);
});

closeModalImage.addEventListener('click', function() {
    clickClose(modalWindowImage);
});

// Зум картинок
function openPopupImage(data) {
    clickOpen(modalWindowImage);
    popupCaption.textContent = data.name;
    popupImageZoom.src = data.link;
    popupImageZoom.alt = data.name;
}
