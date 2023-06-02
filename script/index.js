const openPopupEl = document.querySelector('#open-popup');
const closePopupEl = document.querySelector('#close-popup');
const editPopupEl = document.querySelector('#edit-popup');
const namePopupEl = document.querySelector('.profile__name');
const jobPopupEl = document.querySelector('.profile__job');
const nameInputEl = document.querySelector('#name-input');
const jobInputEl = document.querySelector('#job-input');
const editFormEl = document.querySelector('#edit-form');


editFormEl.addEventListener('submit',function(event){
    event.preventDefault();
    namePopupEl.textContent = nameInputEl.value;
    jobPopupEl.textContent = jobInputEl.value;
    closePopup(editPopupEl)
})

function openPopup(popupEl){
    popupEl.classList.add('popup_opened');
    nameInputEl.value = namePopupEl.textContent;
    jobInputEl.value = jobPopupEl.textContent;
}

function closePopup(popupEl){
    popupEl.classList.remove('popup_opened');
}
    
openPopupEl.addEventListener('click',function(){
    openPopup(editPopupEl);
})

closePopupEl.addEventListener('click',function(){
    closePopup(editPopupEl);
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
const popupImage = imagePopup.querySelector('.popup-image__image');
const popupText = imagePopup.querySelector('.popup-image__text');

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
      imagePopup.classList.add('popup-image_opened');
      popupImage.src= item.link;
      popupText.textContent = item.name;
      closePopupImage.addEventListener('click', () => imagePopup.classList.remove('popup-image_opened'));
    })
    return newCard;
}

openPopupAdd.addEventListener('click',() => openPopup(addPopup));
closePopupAdd.addEventListener('click', () => closePopup(addPopup));

addFormEl.addEventListener('submit', function(event){
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const values = Object.fromEntries(formData);

  const nameCard = values['place'];
  const linkImg = values['link'];

  const Item = {
      name: nameCard,
      link: linkImg 
  }
  const newElement = createNewCard(Item);
  elementItems.prepend(newElement);
  form.reset();
})