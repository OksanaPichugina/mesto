import Popup from "./Popup.js";
export default class PopupWithSubmit extends Popup {
  constructor(selector, deleteCard) {
    super(selector);
    this._deleteCard = deleteCard;
  }

  setEventListener(card, id) {
    super.setEventListener();
    this.popup.addEventListener("submit", (event) => {
      event.preventDefault();
      this.uxForm();
      this._deleteCard(card, id);
    });
  }
}
