let popup = document.querySelector('.popup');
let popupOpen = document.querySelector('.profile__info-text-button');
let popupClose = document.querySelector('.popup__close');
let closeBtn = document.querySelector('.popup__btn');

let userName = document.querySelector('.profile__title');
let userJob = document.querySelector('.profile__subtitle');
let valueName = document.querySelector('.popup__input_field_name');
let valueJob = document.querySelector('.popup__input_field_caption');

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

function clickSave() {
    popup.classList.remove('popup_open');
}
closeBtn.addEventListener('click', clickSave);

let formElement = document.querySelector('.popup__form');

function formSubmitHandler(evt) {
    evt.preventDefault();
    userName.textContent = valueName.value;
    userJob.textContent = valueJob.value;
}
formElement.addEventListener('submit', formSubmitHandler);
