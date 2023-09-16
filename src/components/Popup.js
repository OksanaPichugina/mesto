export default class Popup {
  constructor(selector) {
    this._selector = selector;
    this.popup = document.querySelector(this._selector);
    this._buttonClose = this.popup.querySelector(".popup__close-button");
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this.popup.classList.add("popup_opened");
    window.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this.popup.classList.remove("popup_opened");
    window.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    const keyOfEsc = 27;
    if (evt.keyCode === keyOfEsc) {
      this.close();
    }
  }

  setEventListener() {
    // устанавливаем обработчик закрытия на крестик
    this._buttonClose.addEventListener("click", () => this.close());

    this.popup.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup")) {
        // устанавливаем обработчик закрытия
        this.close();
      }
    });
  }
}
