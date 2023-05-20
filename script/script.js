const openPopupEl = document.querySelector('#open-popup');
const closePopupEl = document.querySelector('#close-popup');
const editPopupEl = document.querySelector('#edit-popup');
const namePopupEl = document.querySelector('.profile__name');
const jobPopupEl = document.querySelector('.profile__job');
const nameInputEl = document.querySelector('#name-input');
const jobInputEl = document.querySelector('#job-input');
const editFormEl = document.querySelector('#edit-form');

openPopupEl.addEventListener('click',function(){
    openPopup(editPopupEl);
})

closePopupEl.addEventListener('click',function(){
    closePopup(editPopupEl);
})

nameInputEl.value = namePopupEl.textContent;
jobInputEl.value = jobPopupEl.textContent;

editFormEl.addEventListener('submit',function(event){
    event.preventDefault();
    namePopupEl.textContent = nameInputEl.value;
    jobPopupEl.textContent = jobInputEl.value;
    closePopup(editPopupEl)
})

function openPopup(popupEl){
    popupEl.classList.add('popup_is-opened');
}

function closePopup(popupEl){
    popupEl.classList.remove('popup_is-opened');
}
    