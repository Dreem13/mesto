
export default class Card {
    constructor(data, cardSelector, handleCardClick, currentUserId, submitHandler, setLike) {
        this.card = data;
        this.submitHandler = submitHandler;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this.setLike = setLike;
        this.userId = currentUserId;
        this._ownerId = this.card.owner._id;
        this.cardId = this.card._id;
        this.cardElement = this.createCard();
        this.getEventListeners();
        this.removeDeleteButton();
    }

    createCard() {
        const cardTemplate = document.querySelector(this._cardSelector).content;
        const cardTemplateClone = cardTemplate.cloneNode(true);
        const cardElement = cardTemplateClone.querySelector('.elements__card');
        this.deleteButton = cardElement.querySelector('.elements__remove-button');
        this.totalLike = cardElement.querySelector('.elements__total-like');

        this.cardElementName = cardElement.querySelector('.elements__title');
        this.cardElementImage = cardElement.querySelector('.elements__image');

        this.cardElementImage.src = this.card.link;
        this.cardElementImage.alt = this.card.name;
        this.cardElementName.textContent = this.card.name;

        this.like = cardElement.querySelector('.elements__like-button');
        this.totalLike.textContent = this.card.likes.length;
        this.isLiked = this.card.likes.some(like => like._id === this.userId);
        if (this.isLiked) {
          this.like.classList.add('elements__like-button_active');
        }
        
        return cardElement;
    }

    removeDeleteButton () {
      if (this._ownerId !== this.userId) {
        this.deleteButton.remove();
      }
    }

    // функция подтверждения удаления карточки
    openPopupDeleteConfirm () {
      this.submitHandler(this);
    }

    getEventListeners() {
        this.like.addEventListener('click', () => this._likeCard());
        this.deleteButton.addEventListener('click', () => this.openPopupDeleteConfirm(this));
        this.cardElementImage.addEventListener('click', () => this._previewCard());
    }

    _likeCard () {
      this.setLike(this)
    }

    _deleteCard () {
        this.cardElement.remove();
    }

    _previewCard () {
        this._handleCardClick(this.card);
    }

    renderCard () {
      return this.cardElement;
    }

    getId () {
      return this.card._id;
    }

    getIsLiked () {
      return this.isLiked;
    }

    updateLikesInfo (likes) {
      this.card.likes = likes;
      this.isLiked = this.card.likes.some(like => like._id === this.userId);
      if (this.isLiked) {
        this.like.classList.add('elements__like-button_active');
        this.totalLike.textContent = this.card.likes.length;
      } else {
        this.like.classList.remove('elements__like-button_active');
        this.totalLike.textContent = this.card.likes.length;
      }
    }

}
