export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._text = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._element = this._getTemplate();
    this._elemImage = this._element.querySelector(".element__image");
    this._handleCardClick = handleCardClick;
    this._buttonLike = this._element.querySelector(".element__like");
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
    this._elemImage.src = this._link;
    this._element
      .querySelector(".element__name")
      .querySelector(".element__text").textContent = this._text;
    this._elemImage.alt = this._text;
    return this._element;
  }

  _setEventListeners() {
    this._elemImage.addEventListener("click", () => {
      this._handleCardClick();
    });

    const deleteButton = this._element.querySelector(".element__delite");
    deleteButton.addEventListener("click", () => {
      this._element.remove();
      this._element = null;
    });

    function likeActive(likeButton) {
      likeButton.classList.toggle("element__like_active");
    }

    this._buttonLike.addEventListener("click", () => {
      likeActive(this._buttonLike);
    });
  }
}
