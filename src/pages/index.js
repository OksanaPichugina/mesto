import "../pages/index.css";
import {
  editOpenPopupEl,
  nameInputEl,
  jobInputEl,
  editFormEl,
  formSelectors,
  addFormEl,
  addOpenPopupEl,
  initialCards,
} from "../utils/constants.js";
import { Card } from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
const addFormValid = new FormValidator(formSelectors, addFormEl);
addFormValid.enableValidation();

const editFormValid = new FormValidator(formSelectors, editFormEl);
editFormValid.enableValidation();
const user = new UserInfo(".profile__name", ".profile__job");

const editForm = new PopupWithForm("#edit-popup", {
  callback: (formValues) => {
    user.setUserInfo(formValues.name, formValues.job);
    editForm.close();
  },
});
editForm.setEventListener();
editOpenPopupEl.addEventListener("click", () => {
  editForm.open();
  const userInform = user.getUserInfo();
  nameInputEl.value = userInform.name;
  jobInputEl.value = userInform.job;
});

const popupWithImage = new PopupWithImage("#image-popup");
function createCard(item){
  const card = new Card(item, "#element-template", () => {
    popupWithImage.open(item);
    popupWithImage.setEventListener();
  });
  return card.getView();
}
const cardList = new Section(
  {
    renderer: (item) => {
      cardList.addItem(createCard(item));
    },
  },
  ".elements__list"
);

cardList.renderItems(initialCards);
const addForm = new PopupWithForm("#add-popup", {
  callback: (formValues) => {
    const nameCard = formValues.place;
    const linkImg = formValues.link;
    const newItem = {
      name: nameCard,
      link: linkImg,
    };
    cardList.addItem(createCard(newItem));

    addForm.close();
    addFormValid.toggleButtonState();
  },
});

addForm.setEventListener();
addOpenPopupEl.addEventListener("click", () => {
  addForm.open();
});
