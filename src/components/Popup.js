export default class Popup {
constructor (popupSelector) {
  this.popupSelector = popupSelector;
  this.popup = document.querySelector(popupSelector);
}

open () {
  this.popup.classList.add('popup_open');
  document.addEventListener('keydown', this._handleEscClose.bind(this));
}

close () {
  this.popup.classList.remove('popup_open');
  document.removeEventListener('keydown', this._handleEscClose.bind(this));
}

_handleEscClose = (evt) => {
  if (evt.key === 'Escape') {
    const currentPopup = document.querySelector('.popup_open');
    this.close(currentPopup);
}
}

setEventListeners () {
  this.popup.querySelector('.popup__close').addEventListener('click', () => { this.close(); } );
}

}

