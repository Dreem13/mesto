import Popup from '../components/Popup.js';

export default class PopupWithImage extends Popup {
    constructor(formSelector) {
        super(formSelector);
        this._popupCaption = this.popup.querySelector('.popup__caption');
        this._popupImageZoom = this.popup.querySelector('.popup__image');
    }

    open(data) {
        this._popupImageZoom.src = data.link;
        this._popupImageZoom.alt = data.name;
        this._popupCaption.textContent = data.name;
        super.open();
    }
}
