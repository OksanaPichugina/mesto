export default class Popup{
    constructor (selector){
        this._selector=selector;        
        this.popup = document.querySelector(this._selector);
    }
    _handleEscClose(evt){
        const keyOfEsc=27;
        if (evt.keyCode === keyOfEsc){
        this.popup.close();
        }
    }
    

    open(){
        this.popup.classList.add('popup_opened');
        //document.addEventListener('keydown',this._handleEscClose());
    }

    close(){
        this.popup.classList.remove('popup_opened');
       // document.removeEventListener('keydown',this._handleEscClose());
    }



    setEventListener(){
        const closeButtons = document.querySelectorAll('.popup__close-button');
        closeButtons.forEach((button) => {
            // устанавливаем обработчик закрытия на крестик
            button.addEventListener('click', () => this.close());
        });

        const overlays = document.querySelectorAll('.popup');
        overlays.forEach((overlay) => {
            overlay.addEventListener('click', function (evt){
                if (evt.target.classList.contains('popup')) {
                    // устанавливаем обработчик закрытия 
                    this.classList.remove('popup_opened');
                }
            })
        })

        const keyOfEsc=27;
        function closingByEsc(evt){
            if (evt.keyCode === keyOfEsc){
                const popup = document.querySelector('.popup_opened');
                console.log(popup)
                popup.classList.remove('popup_opened');
            }
        }

        document.addEventListener('keydown',closingByEsc);
    }
}