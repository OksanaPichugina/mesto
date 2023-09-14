import "../pages/index.css";
import {
  openPopupEl,
  nameInputEl,
  jobInputEl,
  editFormEl,
  formSelectors,
  addFormEl,
  openPopupAdd,
  initialCards,
} from "../utils/constants.js";
import { Card } from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";

const user = new UserInfo(".profile__name", ".profile__job");

const editForm = new PopupWithForm("#edit-popup", {
  callback: (formValues) => {
    user.setUserInfo(formValues.name, formValues.job);
    editForm.close();
  },
});
editForm.setEventListener();
openPopupEl.addEventListener("click", () => {
  editForm.open();
  const userInform = user.getUserInfo();
  nameInputEl.value = userInform.name;
  jobInputEl.value = userInform.job;
});

const openItem = new PopupWithImage("#image-popup");

const cardList = new Section(
  {
    renderer: (item) => {
      const card = new Card(item, "#element-template", () => {
        openItem.open(item);
        openItem.setEventListener();
      });
      const cardElement = card.getView();
      cardList.addItem(cardElement);
    },
  },
  ".elements__list"
);

cardList.renderItems(initialCards);
const addForm = new PopupWithForm("#add-popup", {
  callback: (formValues) => {
    const form = event.target;
    const formData = new FormData(form);
    const values = Object.fromEntries(formData);

    const nameCard = formValues.place;
    const linkImg = formValues.link;
    const item1 = [
      {
        name: nameCard,
        link: linkImg,
      },
    ];
    cardList.renderItems(item1);

    addForm.close();
  },
});
addForm.setEventListener();
openPopupAdd.addEventListener("click", () => {
  addForm.open();
});

const addFormValid = new FormValidator(formSelectors, addFormEl);
console.log(addFormValid);
addFormValid.enableValidation();

const editFormValid = new FormValidator(formSelectors, editFormEl);
editFormValid.enableValidation();
