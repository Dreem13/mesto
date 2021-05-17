import Popup  from '../components/Popup.js';

export default class PopupWithImage extends Popup {
  constructor (formSelector) {
    super(formSelector);
  }

  open (data) {
    const popupCaption = this.popup.querySelector('.popup__caption');
    const popupImageZoom = this.popup.querySelector('.popup__image');
    popupImageZoom.src = data.link;
    popupImageZoom.alt = data.name;
    popupCaption.textContent = data.name;
    super.open();
  }

}
