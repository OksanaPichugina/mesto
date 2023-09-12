import {popupImage, popupText, imagePopup, openPopup} from '../pages/index.js';

export class Card {
    constructor(data, templateSelector, handleCardClick){
      this._text=data.name;
      this._link = data.link;
      this._templateSelector = templateSelector;
      this._element = this._getTemplate();
      this._elemImage = this._element.querySelector('.element__image');
      this._openPopUP = handleCardClick;
    }
  
    _getTemplate(){
      const cardElement = document
      .querySelector(this._templateSelector ).content
      .querySelector('.element')
      .cloneNode(true);
    
      return cardElement;
    }
  
      getView(){
        this._setEventListeners();
        this._elemImage.src = this._link;
        this._element.querySelector('.element__name').querySelector('.element__text').textContent = this._text;
        this._elemImage.alt = this._text;
  
        return this._element; 
      }
  
     // _handleOpenPopup(){ 
      //  openPopup(imagePopup); 
      //  popupImage.src = this._link; 
      //  popupText.textContent = this._text; 
      //  popupImage.alt = this._text; 
      //}
  
      _setEventListeners(){

        this._elemImage.addEventListener('click', () => {
          this._openPopUP()
        })
  
        const deliteButton = this._element.querySelector('.element__delite');
        deliteButton.addEventListener('click', () => {
            this._element.remove();
        })
  
        const likeButton = this._element.querySelector('.element__like');
        likeButton.addEventListener('click', () => {
            likeButton.classList.toggle('element__like_active')
        })
  
      }
    }