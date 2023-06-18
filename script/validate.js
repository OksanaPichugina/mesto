
// валидация
 
const enableValidation = ({formSelector,inputSelector,submitButtonSelector,inactiveButtonClass,inputErrorClass,errorClass}) => {

    const showInputError = (formElement, inputElement, errorMessage) => {
      const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.add(`${inputErrorClass}`);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(`${errorClass}`);
    };
  
    const hideInputError = (formElement, inputElement) => {
      const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.remove(`${inputErrorClass}`);
      errorElement.classList.remove(`${errorClass}`);
      errorElement.textContent = '';
    };
  
    const checkInputValidity = (formElement, inputElement) => {
      if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
      } else {
        hideInputError(formElement, inputElement);
      }
    };
  
    const setEventListeners = (formElement) => {
      const inputList = Array.from(formElement.querySelectorAll(`.${inputSelector}`));
      const buttonElement = formElement.querySelector(`.${submitButtonSelector}`);
      toggleButtonState(inputList, buttonElement);
      inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
          checkInputValidity(formElement, inputElement);
          toggleButtonState(inputList, buttonElement);
        });
      });
    };

    function hasInvalidInput(inputList ){
      return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
    }
    
    function toggleButtonState(inputList, buttonElement){
      if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(`${inactiveButtonClass}`);
      buttonElement.setAttribute("disabled", "true");
    } else {
      buttonElement.classList.remove(`${inactiveButtonClass}`);
      buttonElement.removeAttribute("disabled");
    }
    }

    const formList = Array.from(document.querySelectorAll(`.${formSelector}`));
    formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  
    setEventListeners(formElement);
    });
  };
  
  enableValidation({
    formSelector: 'popup__form',
    inputSelector: 'popup__input',
    submitButtonSelector: 'popup__submit',
    inactiveButtonClass: 'popup__button-save__inactive',
    inputErrorClass: 'form__input_error',
    errorClass: 'popup__input-error_active'
  });
  