const openPopupEl = document.querySelector("#open-popup");
const nameInputEl = document.querySelector("#name-input");
const jobInputEl = document.querySelector("#job-input");
const editFormEl = document.querySelector("#edit-form");
const formSelectors = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__button-save__inactive",
  inputErrorClass: "form__input_error",
  errorClass: "popup__input-error_active",
};

const addFormEl = document.querySelector("#add-form");
const openPopupAdd = document.querySelector("#open-popup-add-button");
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export {
  openPopupEl,
  nameInputEl,
  jobInputEl,
  editFormEl,
  formSelectors,
  addFormEl,
  openPopupAdd,
  initialCards,
};
