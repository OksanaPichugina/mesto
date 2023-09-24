export class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    handleDelete,
    ownerId,
    handleLikeClick
  ) {
    this._text = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._element = this._getTemplate();
    this._elemImage = this._element.querySelector(".element__image");
    this._handleCardClick = handleCardClick;
    this._buttonLike = this._element.querySelector(".element__like_button");
    this._buttonDelete = this._element.querySelector(".element__delite");
    this._id = data._id;
    this._handleDelete = handleDelete;
    this._cardOwnerId = data.owner._id;
    this._ownerId = ownerId;
    
    this._quantityLikes = data.likes.length;
    this._handleLikeClick = handleLikeClick;
    this._likes = data.likes;
    
    this._data = data;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  getView() {
    this._setEventListeners();
    this.activeButtonDelete();
    this._elemImage.src = this._link;
    this._element
      .querySelector(".element__name")
      .querySelector(".element__text").textContent = this._text;
    this._elemImage.alt = this._text;
    this._element
      .querySelector(".element__like")
      .querySelector(".element__like_count").textContent = this._quantityLikes;
    this._checkLike();
    return this._element;
  }
  // метод удаления карточки
  remove() {
    //this._element.remove();
    //this._element = null;
    console.log(this._id);
    this._handleDelete(this._id);
  }

  activeButtonDelete() {
    if (this._ownerId === this._cardOwnerId) {
      this._buttonDelete.classList.add("element__delite_active");
    }
  }

  // метод лайка карточки
  like() {
    // console.log(this._quantityLikes);
    let bool;
    if (this._buttonLike.classList.contains("element__like_button_active")) {
      bool = true;
    } else {
      bool = false;
    }
    //console.log(bool);
   //console.log(this._data)
    this._handleLikeClick(this._id, bool);
  }

  likeCard(quantity) {
    this._buttonLike.classList.toggle("element__like_button_active");
    this._element
      .querySelector(".element__like")
      .querySelector(".element__like_count").textContent = quantity;
      console.log(this._data)
  }

  _checkLike() {
    this._likes.forEach((like) => {
      console.log(like);
      if ((this._ownerId == like._id)) {
        this._buttonLike.classList.add("element__like_button_active");
      }
    });
  }

  _setEventListeners() {
    this._elemImage.addEventListener("click", () => {
      this._handleCardClick();
    });

    this._buttonDelete.addEventListener("click", () => this.remove());

    this._buttonLike.addEventListener("click", () => this.like());
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }
}
