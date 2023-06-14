
// валидация
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('form__input_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_active');
  };
  
  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('form__input_error');
    errorElement.classList.remove('popup__input-error_active');
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
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.form__submit');
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };
  
  const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  
    setEventListeners(formElement);
  });
  }
  
  enableValidation();
  
  function hasInvalidInput(inputList ){
    return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
  }
  
  function toggleButtonState(inputList, buttonElement){
    if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__button-save__inactive');
  } else {
    buttonElement.classList.remove('popup__button-save__inactive');
  }
  }
  
  
  
  // закрытие попапа через ESC
    document.addEventListener('keydown',function(evt){
      const popup = document.querySelector('.popup_opened')
      if (evt.keyCode === 27){
        closePopup(popup);
      }
    })
  
  
  // закрытие попапа кликом на оверлей
    const overlay = document.querySelectorAll('.popup');
    overlay.forEach((overlay) => {
    overlay.addEventListener('click', function (evt){
      if (evt.target.classList.contains('popup')) {
        // находим к оверлею форму
      const popup = document.querySelector('.popup_opened')
      // устанавливаем обработчик закрытия 
      popup.addEventListener('click', () => closePopup(popup));
      }
    })
  })