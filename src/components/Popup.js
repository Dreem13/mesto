export default class Popup {
constructor (popupSelector) {
  this.popupSelector = popupSelector;
  this.popup = document.querySelector(popupSelector);
}

open () {
  this.popup.classList.add('popup_open');
  document.addEventListener('keyup', (evt) => this._handleEscClose(evt));
}

close () {
  this.popup.classList.remove('popup_open');
  document.removeEventListener('keyup', (evt) => this._handleEscClose(evt));
}

_handleEscClose = (evt) => {
  if (evt.key === 'Escape') {
    const currentPopup = document.querySelector('.popup_open');
    this.close(currentPopup);
}
}

setEventListeners () {
  this.popup.querySelector('.popup__close').addEventListener('click', () => this.close());
}

}

