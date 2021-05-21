export default class Popup {
    constructor(popupSelector) {
        this.popupSelector = popupSelector;
        this.popup = document.querySelector(popupSelector);
    }

    // открытие попапов
    open() {
        this.popup.classList.add('popup_open');
        document.addEventListener('keyup', (evt) => this._handleEscClose(evt));
    }

    // закрытие попапов
    close() {
        this.popup.classList.remove('popup_open');
        document.removeEventListener('keyup', (evt) => this._handleEscClose(evt));
    }

    // закрытие попапов по Esc
    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            const currentPopup = document.querySelector('.popup_open');
            this.close(currentPopup);
        }
    }

    setEventListeners() {
        // закрытие попапов на крестик
        this.popup.querySelector('.popup__close').addEventListener('click', () => this.close());
        // закрытие попапов по оверлею
        this.popup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup__overlay')) {
                this.close();
            }
        });
    }
}