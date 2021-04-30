import { clickOpen } from './utils/utils.js';

const modalWindowImage = document.querySelector('.popup_type_image');
const popupCaption = document.querySelector('.popup__caption');
const popupImageZoom = document.querySelector('.popup__image');

export class Card {
    constructor(cardData, cardTemplateId) {
        this.cardTemplateId = cardTemplateId;
        this.cardData = cardData;
        this.cardElement = this._createCard();
        this.like = this.cardElement.querySelector('.elements__like-button');
        this.itemElementCard = this.cardElement.querySelector('.elements__card');
        this._getEventListeners();
    }

    _createCard() {
        const cardTemplate = document.querySelector(this.cardTemplateId).content;
        const cardElement = cardTemplate.cloneNode(true);
        const title = cardElement.querySelector('.elements__title');
        const image = cardElement.querySelector('.elements__image');
        title.textContent = this.cardData.name;
        image.src = this.cardData.link;
        image.alt = this.cardData.name;
        return cardElement;
    }

    _getEventListeners() {
        const deleteButton = this.cardElement.querySelector('.elements__remove-button');
        const like = this.cardElement.querySelector('.elements__like-button');
        const openModalImage = this.cardElement.querySelector('.elements__image');

        like.addEventListener('click', () => this._likeCard());
        deleteButton.addEventListener('click', () => this._deleteCard());
        openModalImage.addEventListener('click', () => this._previewCard());
    }

    _likeCard() {
        this.like.classList.toggle('elements__like-button_active');
    }

    _deleteCard() {
        this.itemElementCard.remove();
    }

    _previewCard() {
        clickOpen(modalWindowImage);
        popupCaption.textContent = this.cardData.name;
        popupImageZoom.src = this.cardData.link;
        popupImageZoom.alt = this.cardData.name;
    }

    renderCard() {
        return this.cardElement;
    }
}