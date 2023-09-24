(()=>{"use strict";const e=document.querySelector("#open-popup"),t=document.querySelector("#name-input"),s=document.querySelector("#job-input"),n=document.querySelector("#edit-form"),o={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__submit",inactiveButtonClass:"popup__button-save__inactive",inputErrorClass:"form__input_error",errorClass:"popup__input-error_active"},r=document.querySelector("#open-avatar-popup"),i=document.querySelector("#avatar-popup"),a=(document.querySelector("#avatar-input"),document.querySelector("#add-form")),l=document.querySelector("#open-popup-add-button");class h{constructor(e,t,s,n,o,r){this._text=e.name,this._link=e.link,this._templateSelector=t,this._element=this._getTemplate(),this._elemImage=this._element.querySelector(".element__image"),this._handleCardClick=s,this._buttonLike=this._element.querySelector(".element__like_button"),this._buttonDelete=this._element.querySelector(".element__delite"),this._id=e._id,this._handleDelete=n,this._cardOwnerId=e.owner._id,this._ownerId=o,this._quantityLikes=e.likes.length,this._handleLikeClick=r,this._likes=e.likes,this._data=e}_getTemplate(){return document.querySelector(this._templateSelector).content.querySelector(".element").cloneNode(!0)}getView(){return this._setEventListeners(),this.activeButtonDelete(),this._elemImage.src=this._link,this._element.querySelector(".element__name").querySelector(".element__text").textContent=this._text,this._elemImage.alt=this._text,this._element.querySelector(".element__like").querySelector(".element__like_count").textContent=this._quantityLikes,this._checkLike(),this._element}remove(){console.log(this._id),this._handleDelete(this._id)}activeButtonDelete(){this._ownerId===this._cardOwnerId&&this._buttonDelete.classList.add("element__delite_active")}like(){let e;e=!!this._buttonLike.classList.contains("element__like_button_active"),this._handleLikeClick(this._id,e)}likeCard(e){this._buttonLike.classList.toggle("element__like_button_active"),this._element.querySelector(".element__like").querySelector(".element__like_count").textContent=e,console.log(this._data)}_checkLike(){this._likes.forEach((e=>{this._ownerId==e._id&&this._buttonLike.classList.add("element__like_button_active")}))}_setEventListeners(){this._elemImage.addEventListener("click",(()=>{this._handleCardClick()})),this._buttonDelete.addEventListener("click",(()=>this.remove())),this._buttonLike.addEventListener("click",(()=>this.like()))}deleteCard(){this._element.remove(),this._element=null}}class c{constructor(e){this._selector=e,this.popup=document.querySelector(this._selector),this._buttonClose=this.popup.querySelector(".popup__close-button"),this._handleEscClose=this._handleEscClose.bind(this),this._buttonSave=this.popup.querySelector(".popup__button-save")}open(){this.popup.classList.add("popup_opened"),window.addEventListener("keydown",this._handleEscClose)}close(){this.popup.classList.remove("popup_opened"),window.removeEventListener("keydown",this._handleEscClose)}_handleEscClose(e){27===e.keyCode&&this.close()}setEventListener(){this._buttonClose.addEventListener("click",(()=>this.close())),this.popup.addEventListener("click",(e=>{e.target.classList.contains("popup")&&this.close()}))}}class u extends c{constructor(e,{callback:t}){super(e),this._inputs=this.popup.querySelectorAll(".popup__input"),this._callback=t,this._fom=this.popup.querySelector(".popup__form")}setEventListener(){super.setEventListener(),this.popup.addEventListener("submit",(e=>{e.preventDefault(),this.renderLoading(!0),this._callback(this._getInputValues())}))}open(){super.open()}close(){super.close(),this._fom.reset()}_getInputValues(){const e={};return this._inputs.forEach((t=>{const s=t.name,n=t.value;e[s]=n})),e}renderLoading(e){this._buttonSave.textContent=e?"Сохранение...":"Сохранить"}}class _{constructor(e,t){this._formSelectors=e,this._formElem=t,this._formList=Array.from(this._formElem.querySelectorAll(this._formSelectors.inputSelector)),this._button=this._formElem.querySelector(this._formSelectors.submitButtonSelector)}enableValidation(){this._formElem.addEventListener("submit",(e=>e.preventDefault())),this._setEventListeners()}_showInputError(e,t){const s=this._formElem.querySelector(`.${e.id}-error`);e.classList.add(this._formSelectors.inputErrorClass),s.textContent=t,s.classList.add(this._formSelectors.errorClass)}_hideInputError=e=>{const t=this._formElem.querySelector(`.${e.id}-error`);e.classList.remove(this._formSelectors.inputErrorClass),t.classList.remove(this._formSelectors.errorClass),t.textContent=""};_checkInputValidity(e){e.validity.valid?this._hideInputError(e):this._showInputError(e,e.validationMessage)}_setEventListeners(){this._formList.forEach((e=>{this.toggleButtonState(),e.addEventListener("input",(()=>{this._checkInputValidity(e),this.toggleButtonState()}))}))}_hasInvalidInput(){return this._formList.some((e=>!e.validity.valid))}toggleButtonState(){this._hasInvalidInput()?(this._button.classList.add(this._formSelectors.inactiveButtonClass),this._button.setAttribute("disabled","true")):(this._button.classList.remove(this._formSelectors.inactiveButtonClass),this._button.removeAttribute("disabled"))}}const d=new _(o,a);d.enableValidation(),new _(o,n).enableValidation();const p=new _(o,i);p.enableValidation();const m=new class{constructor(e,t,s){this.name=document.querySelector(e),this.job=document.querySelector(t),this.avatar=document.querySelector(s)}getUserInfo(){return{name:this.name.textContent,job:this.job.textContent,avatar:this.avatar.src}}setUserInfo(e,t,s){this.name.textContent=e,this.job.textContent=t,this.avatar.src=s}}(".profile__name",".profile__job",".profile__img"),v=new class{constructor({url:e,headers:t}){this._url=e,this._headers=t}_getResponseData(e){return e.ok?e.json():Promise.reject(`Ошибка: ${e.status}`)}getMethodCards(){return fetch(`${this._url}/cards`,{method:"GET",headers:this._headers}).then((e=>this._getResponseData(e)))}getMethodUser(){return fetch(`${this._url}/users/me`,{method:"GET",headers:this._headers}).then((e=>this._getResponseData(e)))}postCard(e,t){return fetch(`${this._url}/cards`,{method:"POST",headers:this._headers,body:JSON.stringify({name:e,link:t})}).then((e=>this._getResponseData(e)))}patchMethod(e,t){return fetch(`${this._url}/users/me`,{method:"PATCH",headers:this._headers,body:JSON.stringify({name:e,about:t})}).then((e=>this._getResponseData(e)))}patchAvatar(e){return fetch(`${this._url}/users/me/avatar`,{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e})}).then((e=>this._getResponseData(e)))}deleteMethod(e){return fetch(`${this._url}/cards/${e}`,{method:"DELETE",headers:this._headers}).then((e=>this._getResponseData(e)))}putLike(e){return fetch(`${this._url}/cards/${e}/likes`,{method:"PUT",headers:this._headers}).then((e=>this._getResponseData(e)))}removeLike(e){return fetch(`${this._url}/cards/${e}/likes`,{method:"DELETE",headers:this._headers}).then((e=>this._getResponseData(e)))}}({url:"https://nomoreparties.co/v1/cohort-75",headers:{authorization:"2f4a0f3f-0cc6-4586-a3d5-35eed1a37f2e","Content-Type":"application/json"}});let g="";const L=new u("#edit-popup",{callback:e=>{v.patchMethod(e.name,e.job).then((e=>(m.setUserInfo(e.name,e.about,e.avatar),e.avatar))).then((t=>{m.setUserInfo(e.name,e.job,t),L.close()})).catch((e=>{console.log(e)})).finally((()=>{L.renderLoading(!1)}))}});L.setEventListener();const k=new u("#avatar-popup",{callback:e=>{v.patchAvatar(e.avatar).then((e=>{m.setUserInfo(e.name,e.about,e.avatar),k.close(),p.toggleButtonState()})).catch((e=>{console.log(e)})).finally((()=>{k.renderLoading(!1)}))}});k.setEventListener();const f=new class extends c{constructor(e){super(e),this._popupImage=this.popup.querySelector(".popup__image"),this._popupText=this.popup.querySelector(".popup__text")}open(e){super.open(),this._popupImage.src=e.link,this._popupText.textContent=e.name,this._popupImage.alt=e.name}}("#image-popup"),b=new class extends c{constructor(e,t){super(e),this._deleteCard=t,this._form=this.popup.querySelector(".popup__form")}setEventListener(){super.setEventListener(),this._form.addEventListener("submit",(e=>{e.preventDefault(),this.renderLoading(!0),this._deleteCard(this._card,this._id)}))}rememberCardAndId(e,t){this._card=e,this._id=t}renderLoading(e){this._buttonSave.textContent=e?"Сохранение...":"Да"}}("#submit-popup",((e,t)=>{v.deleteMethod(t).then((()=>{e.deleteCard(),b.close()})).catch((e=>{console.log(e)})).finally((()=>{b.renderLoading(!1)}))}));b.setEventListener();const S=new u("#add-popup",{callback:e=>{const t=e.place,s=e.link;v.postCard(t,s).then((e=>{const t=E(e);y.addItem(t),S.close(),d.toggleButtonState()})).catch((e=>{console.log(e)})).finally((()=>{S.renderLoading(!1)}))}});function E(e){const t=new h(e,"#element-template",(()=>{f.open(e)}),(e=>{b.open(),b.rememberCardAndId(t,e)}),g,((e,s)=>{s?v.removeLike(e).then((e=>{t.likeCard(e.likes.length)})).catch((e=>{console.log(e)})):v.putLike(e).then((e=>{t.likeCard(e.likes.length)})).catch((e=>{console.log(e)}))}));return t.getView()}S.setEventListener(),f.setEventListener(),Promise.all([v.getMethodUser(),v.getMethodCards()]).then((e=>{var t,s;console.log(e),t=e[0],m.setUserInfo(t.name,t.about,t.avatar),g=t._id,s=e[1],y.renderItems(s)})).then((()=>{e.addEventListener("click",(()=>{L.open();const e=m.getUserInfo();t.value=e.name,s.value=e.job})),r.addEventListener("click",(()=>{k.open()})),l.addEventListener("click",(()=>{S.open()}))})).catch((e=>{console.log(e)}));const y=new class{constructor({renderer:e},t){this._renderer=e,this._container=document.querySelector(t)}addItem(e){this._container.prepend(e)}clear(){this._container.innerHTML=""}renderItems(e){e.forEach((e=>{this._renderer(e)}))}}({renderer:e=>{y.addItem(E(e))}},".elements__list")})();