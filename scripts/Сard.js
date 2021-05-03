import { clickOpen } from './Utils/Utils.js';

const modalWindowImage = document.querySelector('.popup_type_image');
const popupCaption = document.querySelector('.popup__caption');
const popupImageZoom = document.querySelector('.popup__image');

export class Card {
    constructor(cardData, cardTemplateId) {
        this._cardTemplateId = cardTemplateId;
        this._cardData = cardData;
        this._cardElement = this._createCard();
        this._like = this._cardElement.querySelector('.elements__like-button');
        this._itemElementCard = this._cardElement.querySelector('.elements__card');
        this._getEventListeners();
    }

    _createCard() {
        const cardTemplate = document.querySelector(this._cardTemplateId).content;
        const cardElement = cardTemplate.cloneNode(true);
        const title = cardElement.querySelector('.elements__title');
        const image = cardElement.querySelector('.elements__image');
        title.textContent = this._cardData.name;
        image.src = this._cardData.link;
        image.alt = this._cardData.name;
        return cardElement;
    }

    _getEventListeners() {
        const deleteButton = this._cardElement.querySelector('.elements__remove-button');
        const like = this._cardElement.querySelector('.elements__like-button');
        const openModalImage = this._cardElement.querySelector('.elements__image');

        like.addEventListener('click', () => this._likeCard());
        deleteButton.addEventListener('click', () => this._deleteCard());
        openModalImage.addEventListener('click', () => this._previewCard());
    }

    _likeCard() {
        this._like.classList.toggle('elements__like-button_active');
    }

    _deleteCard() {
        this._itemElementCard.remove();
    }

    _previewCard() {
        clickOpen(modalWindowImage);
        popupCaption.textContent = this._cardData.name;
        popupImageZoom.src = this._cardData.link;
        popupImageZoom.alt = this._cardData.name;
    }

    renderCard() {
        return this._cardElement;
    }
}
