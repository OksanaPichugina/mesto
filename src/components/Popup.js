export default class Popup{
    constructor (selector){
        this._selector=selector;        
        this.popup = document.querySelector(this._selector);
    }

    _handleEscClose(evt){
        const keyOfEsc=27;
        if (evt.keyCode === keyOfEsc) {
            const popup = document.querySelector('.popup_opened');
            popup.classList.remove('popup_opened');
        }
    }
    
    

    open(){
        this.popup.classList.add('popup_opened');
        document.addEventListener('keydown',this._handleEscClose);
    }

   close(){
       this.popup.classList.remove('popup_opened');
      document.removeEventListener('keydown',this._handleEscClose);
    }



    setEventListener(){
        const closeButton =this.popup.querySelector('.popup__close-button');
        
            // устанавливаем обработчик закрытия на крестик
            closeButton.addEventListener('click', () => this.close());
        
        
        this.popup.addEventListener('click', function (evt){
                if (evt.target.classList.contains('popup')) {
                    // устанавливаем обработчик закрытия 
                    this.classList.remove('popup_opened');
                }
            })
        

        // const keyOfEsc=27;
        // function closingByEsc(evt){
        //     if (evt.keyCode === keyOfEsc){
        //         const popup = document.querySelector('.popup_opened');
        //         console.log(popup)
        //         popup.classList.remove('popup_opened');
        //     }
        // }

        // document.addEventListener('keydown',closingByEsc);
    }
}