import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._popupImage = this.popup.querySelector(".popup__image");
    this._popupText = this.popup.querySelector(".popup__text");
  }

  open(data) {
    super.open();

    this._popupImage.src = data.link;
    this._popupText.textContent = data.name;
    this._popupImage.alt = data.name;
  }
}
