export class FormValidator {
  constructor(formSelectors, formElem) {
    this._formSelectors = formSelectors;
    this._formElem = formElem;
    this._formList = Array.from(
      this._formElem.querySelectorAll(this._formSelectors.inputSelector)
    );
    this._button = this._formElem.querySelector(
      this._formSelectors.submitButtonSelector
    );
  }

  enableValidation() {
    this._formElem.addEventListener("submit", (evt) => evt.preventDefault());
    this._setEventListeners();
  }

  // показывает текст ошибки
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElem.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._formSelectors.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._formSelectors.errorClass);
  }

  // скрывает текст ошибки
  _hideInputError = (inputElement) => {
    const errorElement = this._formElem.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._formSelectors.inputErrorClass);
    errorElement.classList.remove(this._formSelectors.errorClass);
    errorElement.textContent = "";
  };

  // проверяет на валидацию и вызывает функции
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // слушатель на поля ввода
  _setEventListeners() {
    this._formList.forEach((inputElement) => {
      this.toggleButtonState();
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  }

  // проверка
  _hasInvalidInput() {
    return this._formList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._button.classList.add(this._formSelectors.inactiveButtonClass);
      this._button.setAttribute("disabled", "true");
    } else {
      this._button.classList.remove(this._formSelectors.inactiveButtonClass);
      this._button.removeAttribute("disabled");
    }
  }
}
