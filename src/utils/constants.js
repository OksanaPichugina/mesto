const editOpenPopupEl = document.querySelector("#open-popup");
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

const avatarOpenPopupEl = document.querySelector("#open-avatar-popup");
const avatarFormEl = document.querySelector("#avatar-popup");
const avatarInputEl = document.querySelector("#avatar-input");

const addFormEl = document.querySelector("#add-form");
const addOpenPopupEl = document.querySelector("#open-popup-add-button");

export {
  editOpenPopupEl,
  nameInputEl,
  jobInputEl,
  editFormEl,
  formSelectors,
  addFormEl,
  addOpenPopupEl,
  avatarOpenPopupEl,
  avatarFormEl,
  avatarInputEl
};
