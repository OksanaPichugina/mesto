import '../pages/index.css';
import {Card} from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js'
import {FormValidator} from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
const openPopupEl = document.querySelector('#open-popup');
const closePopupEl = document.querySelector('#close-popup');
const editPopupEl = document.querySelector('#edit-popup');
const namePopupEl = document.querySelector('.profile__name');
const jobPopupEl = document.querySelector('.profile__job');
const nameInputEl = document.querySelector('#name-input');
const jobInputEl = document.querySelector('#job-input');
const editFormEl = document.querySelector('#edit-form');
const closeButtons = document.querySelectorAll('.popup__close-button');
const formSelectors  ={
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__button-save__inactive',
  inputErrorClass: 'form__input_error',
  errorClass: 'popup__input-error_active'
}


// форма редактирования имени и работы
//editFormEl.addEventListener('submit',function(event){

   // event.preventDefault();
    //namePopupEl.textContent = nameInputEl.value;
    //jobPopupEl.textContent = jobInputEl.value;
    //closePopup(editPopupEl)
//})



openPopupEl.addEventListener('click', () => {
  const editForm = new PopupWithForm('#edit-popup', {callback : (event) => {
    event.preventDefault();
    //namePopupEl.textContent = nameInputEl.value;
    //jobPopupEl.textContent = jobInputEl.value;
    const User = new UserInfo ('.profile__name','.profile__job');
    User.setUserInfo(nameInputEl.value,jobInputEl.value);
  }});
  editForm.open();
  editForm.setEventListener();
});


// функция закрытия через Esc
//export const keyOfEsc=27;
//export function closingByEsc(evt){
  //  if (evt.keyCode === keyOfEsc){
   //   const popup = document.querySelector('.popup_opened');
 //     closePopup(popup);
  //  }
//}

// функция открытия любого попапа
export function openPopup(popupEl){
  popupEl.classList.add('popup_opened');
 document.addEventListener('keydown',closingByEsc);
}

// функция закрытия любого попапа
//function closePopup(popupEl){
 // popupEl.classList.remove('popup_opened');
 // document.removeEventListener('keydown',closingByEsc);
//}

// функция кнопки крестик
//closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап 
 // const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  //button.addEventListener('click', () => closePopup(popup));
//});
    

//openPopupEl.addEventListener('click',function(){
  //  openPopup(editPopupEl);
  //  nameInputEl.value = namePopupEl.textContent;
  //  jobInputEl.value = jobPopupEl.textContent;
//})


const template = document.querySelector('#element-template');
const templateContent = template.content;
const element = templateContent.querySelector('.element');
const elementItems = document.querySelector('.elements__list');
const addFormEl = document.querySelector('#add-form');
const openPopupAdd = document.querySelector('#open-popup-add-button');
const addPopup = document.querySelector('#add-popup');
const closePopupAdd = document.querySelector('#close-popup_add');

export const imagePopup = document.querySelector('#image-popup');
const closePopupImage = document.querySelector('#close-popup-image'); 
export const popupImage = imagePopup.querySelector('.popup__image');
export const popupText = imagePopup.querySelector('.popup__text');

let initialCards = [
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
  
  

const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, '#element-template',() => { const openItem = new PopupWithImage('#image-popup',item);
      openItem.open(); openItem.setEventListener()});
      const cardElement = card.getView();
      cardList.addItem(cardElement);
    }
}, '.elements__list');

cardList.renderItems();


//function createNewCard (item){
//  const card = new Card(item, '#element-template');
//  const cardElement = card.getView();
//  return(cardElement)
//}

//  initialCards.forEach((item) => {
    
      // Добавляем в DOM
//    document.querySelector('.elements__list').append(createNewCard (item));
//  }); 


openPopupAdd.addEventListener('click',() => {
 const addForm = new PopupWithForm('#add-popup', {callback : (event) =>{
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const values = Object.fromEntries(formData);

  const nameCard = values['place'];
  const linkImg = values['link'];
  const item1 = [{
      name: nameCard,
      link: linkImg 
  }];
  const newCard = new Section({
    items: item1,
    renderer: (item) => {
      const card = new Card(item, '#element-template', () => { const openItem = new PopupWithImage('#image-popup',item);
      openItem.open(); openItem.setEventListener()});
      const cardElement = card.getView();
      newCard.addItem(cardElement);
    }
}, '.elements__list');

newCard.renderItems();
    // Добавляем в DOM
    //document.querySelector('.elements__list').prepend(createNewCard (item));
  }
})
  addForm.open();
  addForm.setEventListener()
});

//addFormEl.addEventListener('submit', function(event){ 
  //event.preventDefault(); 
  //const form = event.target; 
  //const formData = new FormData(form); 
  //const values = Object.fromEntries(formData); 
 
 // const nameCard = values['place']; 
 // const linkImg = values['link']; 
 
  //const item = { 
 //     name: nameCard, 
 //     link: linkImg  
 // } 
 
    // Добавляем в DOM 
 //   document.querySelector('.elements__list').prepend(createNewCard (item)); 
 // closePopup(addPopup); 
 // form.reset(); 
 // addFormValid.toggleButtonState(); 
//}) 


// закрытие попапа кликом на оверлей
//const overlays = document.querySelectorAll('.popup');
//overlays.forEach((overlay) => {
//overlay.addEventListener('click', function (evt){
  //if (evt.target.classList.contains('popup')) {
    // находим к оверлею форму
  //const popup = document.querySelector('.popup_opened')
  // устанавливаем обработчик закрытия 
  //closePopup(popup);
 // }
//})
//})

const addFormValid = new FormValidator(formSelectors, addFormEl);
console.log(addFormValid);
addFormValid.enableValidation();
const editFormValid = new FormValidator(formSelectors, editFormEl);
editFormValid.enableValidation();