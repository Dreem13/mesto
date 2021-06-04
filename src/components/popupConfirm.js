import Popup from '../components/Popup.js';

export default class popupConfirm extends Popup {
  constructor (popupSelector, deleteCardSubmit) {
    super(popupSelector)
    this.deleteCardSubmit = deleteCardSubmit;
    this.deleteButton = document.querySelector('.elements__remove-button');
    this.popupDelete = document.querySelector('.popup_type_delete');
  }

  setEventListeners () {
    super.setEventListeners();
    this.popupDelete.addEventListener('click', (evt) => {
      evt.preventDefault();
      this.deleteCardSubmit(this.data);
    });
  }

  submitHandler (data) {
    this.data = data;
  }

}
