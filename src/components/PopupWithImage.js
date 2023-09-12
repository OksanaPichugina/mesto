import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
    constructor (selector, data){
        super(selector);
        this.popup = document.querySelector(this._selector);  
        this._text=data.name;
        this._link = data.link;  
    }

    open(){
        super.open();
        const popupImage = this.popup.querySelector('.popup__image');
        
        const popupText = this.popup.querySelector('.popup__text');
        
        popupImage.src = this._link;
        popupText.textContent = this._text;
        popupImage.alt = this._text;
    }
    close(){
        super.close();
    }
    setEventListener(){
        super.setEventListener();
    }
}
