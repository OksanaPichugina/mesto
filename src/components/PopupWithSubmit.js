import Popup from "./Popup.js";
export default class PopupWithSubmit extends Popup {
  constructor(selector, deleteCard) {
    super(selector);
    this._deleteCard = deleteCard;
    this._form = this.popup.querySelector(".popup__form");
  }

  setEventListener() { 
    super.setEventListener(); 
    this._form.addEventListener("submit", (event) => { 
      event.preventDefault(); 
      this.renderLoading(true); 
      this._deleteCard(this._card, this._id); 
    }); 
  } 

  rememberCardAndId(card, id){
    this._card = card;
    this._id = id;
  }

  renderLoading(bool) {
    if (bool) {
      this._buttonSave.textContent = "Сохранение...";
    } else {
      this._buttonSave.textContent = "Да";
    }
  }
}
