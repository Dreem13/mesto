import Popup from '../components/Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitHandler) {
        super(popupSelector);
        this._submitHandler = submitHandler;
        this._button = this.popup.querySelector('.popup__btn_save');
        this._form = this.popup.querySelector('.popup__form');
        this._originalBtnText = this._button.textContent;
        this._inputsList = Array.from(this._form.querySelectorAll('.popup__input'));
    }

    _getInputValues() {
       const values = {};
       this._inputsList.forEach(input => {
            values[input.name] = input.value;
        })
        return values;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitHandler(this._getInputValues());
        });
    }

    close() {
        this._form.reset();
        super.close();
    }

    renderLoading(load) {
    if (load) {
      this._button.textContent = 'Сохранение...';
    } else {
      this._button.textContent = this._originalBtnText;
    }
  }

  showTextSave (status) {
    if (status) {
      this._button.textContent = 'Сохранение...';
    } else {
      this._button.textContent = 'Сохранить';
    }
  }
}
