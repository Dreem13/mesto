export { clickOpen, clickClose, closePopupEscButton };

function clickOpen(popup) {
    popup.classList.add('popup_open');
    document.addEventListener('keydown', closePopupEscButton);
}

function clickClose(popup) {
    popup.classList.remove('popup_open');
    document.removeEventListener('keydown', closePopupEscButton);
}

function closePopupEscButton(evt) {
    const currentPopup = document.querySelector('.popup_open');
    if (evt.key === 'Escape') {
        clickClose(currentPopup);
    };
}