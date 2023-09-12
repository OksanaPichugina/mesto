import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor (selector, {callback}){
        super(selector); 
        this.popup = document.querySelector(this._selector);
        this._inputs = this.popup.querySelectorAll('.popup__input')
        this._callback = callback;    
    }
    open(){
        super.open();
    }
    setEventListener(){
        super.setEventListener();
        const submitButton = this.popup.querySelector('.popup__submit');
        submitButton.addEventListener('click', () => { 
            this.popup.querySelector('.popup__form').addEventListener('submit',this._callback); 
            const popup = document.querySelector('.popup_opened');
            console.log(popup)
            popup.classList.remove('popup_opened');
        });   
    }

    close(){
        super.close();
        this.popup.querySelector('.popup__form').reset();
    }

  _getInputValues(){
        this._inputs.forEach(input => {
            input.name = '';
            this.popup[input.name] = input.value
        })
        
   }
}