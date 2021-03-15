let popup = document.querySelector('.popup');
let popupOpen = document.querySelector('.open');
let popupClose = document.querySelector('.popup__close');

popupOpen.onclick = function () {
popup.classList.add('open');
document.querySelector('.popup__input_name').value = document.querySelector('.profile__title').textContent;
document.querySelector('.popup__input_caption').value = document.querySelector('.profile__subtitle').textContent;
}

popupClose.onclick = function () {
popup.classList.remove('open');
}

let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_name');
let jobInput = document.querySelector('.popup__input_caption');

function formSubmitHandler (evt) {
evt.preventDefault();
document.querySelector('.profile__title').textContent = nameInput.value;
document.querySelector('.profile__subtitle').textContent = jobInput.value;

let btnClose = document.querySelector('.popup__btn');
btnClose.onclick = function () {
popup.classList.remove('open');
}
}

formElement.addEventListener('submit', formSubmitHandler);









