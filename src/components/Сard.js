export default class Card {
    constructor(data, cardSelector, handleCardClick) {
        this.card = data;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this.cardElement = this.createCard();
        this.deleteButton = this.cardElement.querySelector('.elements__remove-button');
        this.like = this.cardElement.querySelector('.elements__like-button');
        this.getEventListeners();
    }

    createCard() {
        const cardTemplate = document.querySelector(this._cardSelector).content;
        const cardTemplateClone = cardTemplate.cloneNode(true);
        const cardElement = cardTemplateClone.querySelector('.elements__card');
        this.cardElementName = cardElement.querySelector('.elements__title');
        this.cardElementImage = cardElement.querySelector('.elements__image');
        this.cardElementImage.src = this.card.link;
        this.cardElementImage.alt = this.card.name;
        this.cardElementName.textContent = this.card.name;
        return cardElement;
    }

    getEventListeners() {
        this.like.addEventListener('click', (evt) => this._likeCard(evt));
        this.deleteButton.addEventListener('click', (evt) => this._deleteCard(evt));
        this.cardElementImage.addEventListener('click', (evt) => this._previewCard(evt));
    }

    _likeCard() {
        this.like.classList.toggle('elements__like-button_active');
    }

    _deleteCard() {
        this.cardElement.remove();
    }

    _previewCard() {
        this._handleCardClick(this.card);
    }

    renderCard() {
        return this.cardElement;
    }
}