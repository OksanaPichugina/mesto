import {popupImage, popupText, keyOfEsc , closingByEsc} from './index.js'
export class Card {
    constructor(data, templateSelector){
      this._text=data.name;
      this._link = data.link;
      this._templateSelector = templateSelector;
    }
  
    _getTemplate(){
      const cardElement = document
      .querySelector(this._templateSelector ).content
      .querySelector('.element')
      .cloneNode(true);
    
      return cardElement;
    }
  
      getView(){
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.element__image').src = this._link;
        this._element.querySelector('.element__name').querySelector('.element__text').textContent = this._text;
        this._element.querySelector('.element__image').alt = this._text;
  
        return this._element; 
      }
  
      _handleOpenPopup(){
        const imagePopup = document.querySelector('#image-popup');
        imagePopup.classList.add('popup_opened');
        popupImage.src = this._link;
        popupText.textContent = this._text;
        popupImage.alt = this._name;
        document.addEventListener('keydown',closingByEsc);
      }
  
      _setEventListeners(){
        const image = this._element.querySelector('.element__image');
        image.addEventListener('click', () => {
          this._handleOpenPopup()
        })
  
        const deliteButton = this._element.querySelector('.element__delite');
        deliteButton.addEventListener('click', (evt) => {
          evt.target.closest('.element').remove();
        })
  
        const likeButton = this._element.querySelector('.element__like');
        likeButton.addEventListener('click', (evt) => {
          evt.target.classList.toggle('element__like_active')
        })
  
      }
    }