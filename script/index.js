const openPopupEl = document.querySelector('#open-popup');
const closePopupEl = document.querySelector('#close-popup');
const editPopupEl = document.querySelector('#edit-popup');
const namePopupEl = document.querySelector('.profile__name');
const jobPopupEl = document.querySelector('.profile__job');
const nameInputEl = document.querySelector('#name-input');
const jobInputEl = document.querySelector('#job-input');
const editFormEl = document.querySelector('#edit-form');
const closeButtons = document.querySelectorAll('.popup__close-button');


editFormEl.addEventListener('submit',function(event){
    event.preventDefault();
    namePopupEl.textContent = nameInputEl.value;
    jobPopupEl.textContent = jobInputEl.value;
    closePopup(editPopupEl)
})
document.addEventListener('keydown',function(evt){ 
  const popup = document.querySelector('.popup_opened') 
  if (evt.keyCode === 27){ closePopup(popup); 
  } 
}) 

function closingByEsc(evt, popup){
  const keyOfEsc=27;
    if (evt.target.keyCode === keyOfEsc){
      closePopup(popup);
    }
}

function openPopup(popupEl){
    popupEl.classList.add('popup_opened');
    document.addEventListener('keydown',closingByEsc(evt,popupEl));
}

function closePopup(popupEl){
  popupEl.classList.remove('popup_opened');
  document.removeEventListener('keydown',closingByEsc);
}

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
const popupImage = imagePopup.querySelector('.popup__image');
const popupText = imagePopup.querySelector('.popup__text');

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

initialCards.forEach(function (item){
    const newCard = createNewCard(item);
    elementItems.prepend(newCard);
});

function createNewCard(item){
    const newCard = element.cloneNode(true);
    const textCard = newCard.querySelector('.element__text');
    textCard.textContent = item.name;
    const imageCard = newCard.querySelector('.element__image');
    imageCard.src = item.link;
    imageCard.alt = item.name;
    const likeButton = newCard.querySelector('.element__like');
    likeButton.addEventListener('click', function (evt){
        evt.target.classList.toggle('element__like_active')
    });
    const deliteButton = newCard.querySelector('.element__delite');
    deliteButton.addEventListener('click', function (evt){
      evt.target.closest('.element').remove();
    });
    
    //открытие карточки в формочке
    imageCard.addEventListener('click', function (){
      openPopup(imagePopup)
      popupImage.src= item.link;
      popupImage.alt= item.name;
      popupText.textContent = item.name;
    })
    return newCard;
}

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
  const newElement = createNewCard(item);
  elementItems.prepend(newElement);
  closePopup(addPopup);
  form.reset();
  const buttonElement = addPopup.querySelector('.popup__submit');
  buttonElement.classList.add('popup__button-save__inactive');
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