import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, { callback }) {
    super(selector);
    this._inputs = this.popup.querySelectorAll(".popup__input");
    this._callback = callback;
    this._fom = this.popup.querySelector(".popup__form");
  }

  setEventListener() {
    super.setEventListener();

    this.popup.addEventListener("submit", (event) => {
      event.preventDefault();
      this._callback(this._getInputValues());
    });
  }

  open() {
    super.open();
  }

  close() {
    super.close();
    this._fom.reset();
  }

  _getInputValues() {
    const formValues = {};
    this._inputs.forEach((input) => {
      const fieldName = input.name;
      const fieldValue = input.value;
      formValues[fieldName] = fieldValue;
    });
    return formValues;
  }
}
