import "../pages/index.css";
import {
  editOpenPopupEl,
  nameInputEl,
  jobInputEl,
  editFormEl,
  formSelectors,
  addFormEl,
  addOpenPopupEl,
  avatarOpenPopupEl,
  avatarFormEl,
  avatarInputEl,
} from "../utils/constants.js";
import { Card } from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import Api from "../components/Api.js";
const addFormValid = new FormValidator(formSelectors, addFormEl);
addFormValid.enableValidation();

const editFormValid = new FormValidator(formSelectors, editFormEl);
editFormValid.enableValidation();

const avatarFormValid = new FormValidator(formSelectors, avatarFormEl);
avatarFormValid.enableValidation();

const cardsApi = {
  url: "https://nomoreparties.co/v1/cohort-75/cards",
  headers: {
    authorization: "2f4a0f3f-0cc6-4586-a3d5-35eed1a37f2e",
    "Content-Type": "application/json",
  },
};
const user = new UserInfo(
  ".profile__name",
  ".profile__job",
  ".profile__avatar"
);

const userApi = {
  url: "https://nomoreparties.co/v1/cohort-75/users/me",
  headers: {
    authorization: "2f4a0f3f-0cc6-4586-a3d5-35eed1a37f2e",
    "Content-Type": "application/json",
  },
};
const cardsApiRes = new Api(cardsApi);
const userApiRes = new Api(userApi);
let ownerId = "";
userApiRes.getMethod().then((us) => {
  user.setUserInfo(us.name, us.about, us.avatar);
  ownerId = us._id;
});

const editForm = new PopupWithForm("#edit-popup", {
  callback: (formValues) => {
    userApiRes.patchMethod(formValues.name, formValues.job).then((res) => {
      user.setUserInfo(res.name, res.about, res.avatar);
    });

    user.setUserInfo(formValues.name, formValues.job, "");
    editForm.close();
  },
});

const avatarForm = new PopupWithForm("#avatar-popup", {
  callback: (formValues) => {
    userApiRes.patchAvatar(formValues.avatar).then((res) => {
      user.setUserInfo(res.name, res.about, res.avatar);
    });
    //user.setUserInfo(formValues.name, formValues.job, '');
    // avatarForm.uxForm();
    avatarForm.close();
  },
});

editForm.setEventListener();
editOpenPopupEl.addEventListener("click", () => {
  editForm.open();
  const userInform = user.getUserInfo();
  nameInputEl.value = userInform.name;
  jobInputEl.value = userInform.job;
});

avatarForm.setEventListener();
avatarOpenPopupEl.addEventListener("click", () => {
  avatarForm.open();
  //const userInform = user.getUserInfo();
  //nameInputEl.value = userInform.name;
  //jobInputEl.value = userInform.job;
});

const popupWithImage = new PopupWithImage("#image-popup");
const popupWithSubmit = new PopupWithSubmit("#submit-popup", (card, idCard) => {
  cardsApiRes
    .deleteMethod(idCard)
    .then(() => {
      card.deleteCard();
    })
    .then(() => {
      popupWithSubmit.close();
    });
});

function createCard(item) {
  const card = new Card(
    item,
    "#element-template",
    () => {
      popupWithImage.open(item);
      popupWithImage.setEventListener();
    },
    (id) => {
      popupWithSubmit.open();
      popupWithSubmit.setEventListener(card, id);
    },
    ownerId,
    (id, bool) => {
      if (bool) {
        cardsApiRes.removeLike(id).then(() => {
          card.likeCard();
          card.getView();
        });
      } else {
        cardsApiRes.putLike(id).then(() => {
          card.likeCard();
          card.getView();
        });
      }
    }
  );
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
cardsApiRes.getMethod().then((cards) => {
  cardList.renderItems(cards);
});

const addForm = new PopupWithForm("#add-popup", {
  callback: (formValues) => {
    const nameCard = formValues.place;
    const linkImg = formValues.link;
    const newItem = {
      name: nameCard,
      link: linkImg,
    };
    cardsApiRes.postCard(nameCard, linkImg).then((res) => {
      editForm.uxForm();
      const newCard = createCard(res);
      console.log(newCard);
      cardList.addItem(newCard);
    });
    avatarForm.uxForm();
    addForm.close();
    addFormValid.toggleButtonState();
  },
});

addForm.setEventListener();
addOpenPopupEl.addEventListener("click", () => {
  addForm.open();
});
