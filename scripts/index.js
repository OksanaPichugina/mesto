import {Card} from './Card.js';
import {FormValidator , formSelectors} from './FormValidator.js';
const openPopupEl = document.querySelector('#open-popup');
const closePopupEl = document.querySelector('#close-popup');
const editPopupEl = document.querySelector('#edit-popup');
const namePopupEl = document.querySelector('.profile__name');
const jobPopupEl = document.querySelector('.profile__job');
const nameInputEl = document.querySelector('#name-input');
const jobInputEl = document.querySelector('#job-input');
const editFormEl = document.querySelector('#edit-form');
const closeButtons = document.querySelectorAll('.popup__close-button');

// форма редактирования имени и работы
editFormEl.addEventListener('submit',function(event){
    event.preventDefault();
    namePopupEl.textContent = nameInputEl.value;
    jobPopupEl.textContent = jobInputEl.value;
    closePopup(editPopupEl)
})


// функция закрытия через Esc
export const keyOfEsc=27;
export function closingByEsc(evt){
  const popup = document.querySelector('.popup_opened');
    if (evt.keyCode === keyOfEsc){
      closePopup(popup);
    }
}

// функция открытия любого попапа
function openPopup(popupEl){
  popupEl.classList.add('popup_opened');
  document.addEventListener('keydown',closingByEsc);
}

// функция закрытия любого попапа
function closePopup(popupEl){
  popupEl.classList.remove('popup_opened');
  document.removeEventListener('keydown',closingByEsc);
}

// функция кнопки крестик
closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап 
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
});
    

openPopupEl.addEventListener('click',function(){
    openPopup(editPopupEl);
    nameInputEl.value = namePopupEl.textContent;
    jobInputEl.value = jobPopupEl.textContent;
})


const template = document.querySelector('#element-template');
const templateContent = template.content;
const element = templateContent.querySelector('.element');
const elementItems = document.querySelector('.elements__list');
const addFormEl = document.querySelector('#add-form');
const openPopupAdd = document.querySelector('#open-popup-add-button');
const addPopup = document.querySelector('#add-popup');
const closePopupAdd = document.querySelector('#close-popup_add');

const imagePopup = document.querySelector('#image-popup');
const closePopupImage = document.querySelector('#close-popup-image'); 
export const popupImage = imagePopup.querySelector('.popup__image');
export const popupText = imagePopup.querySelector('.popup__text');

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 



  initialCards.forEach((item) => {
    const card = new Card(item, '#element-template');
    const cardElement = card.getView();
    
    // Добавляем в DOM
    document.querySelector('.elements__list').append(cardElement);
  }); 


openPopupAdd.addEventListener('click',() => openPopup(addPopup));

addFormEl.addEventListener('submit', function(event){
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const values = Object.fromEntries(formData);

  const nameCard = values['place'];
  const linkImg = values['link'];

  const item = {
      name: nameCard,
      link: linkImg 
  }
  const newElement = new Card(item, '#element-template');;
  const newcardElement = newElement.getView();
    // Добавляем в DOM
  document.querySelector('.elements__list').prepend(newcardElement);
  closePopup(addPopup);
  form.reset();
  const buttonElement = addPopup.querySelector('.popup__submit');
  buttonElement.classList.add('popup__button-save__inactive');
  buttonElement.setAttribute("disabled", "true");
})

// закрытие попапа кликом на оверлей
const overlays = document.querySelectorAll('.popup');
overlays.forEach((overlay) => {
overlay.addEventListener('click', function (evt){
  if (evt.target.classList.contains('popup')) {
    // находим к оверлею форму
  const popup = document.querySelector('.popup_opened')
  // устанавливаем обработчик закрытия 
  closePopup(popup);
  }
})
})

const addFormValid = new FormValidator(formSelectors, addFormEl);
console.log(addFormValid);
addFormValid.enableValidation();
const editFormValid = new FormValidator(formSelectors, editFormEl);
editFormValid.enableValidation();