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

const api = {
  url: "https://nomoreparties.co/v1/cohort-75",
  headers: {
    authorization: "2f4a0f3f-0cc6-4586-a3d5-35eed1a37f2e",
    "Content-Type": "application/json",
  },
};
const user = new UserInfo(".profile__name", ".profile__job", ".profile__img");

const apiRes = new Api(api);

let ownerId = "";

const editForm = new PopupWithForm("#edit-popup", {
  callback: (formValues) => {
    apiRes
      .patchMethod(formValues.name, formValues.job)
      .then((res) => {
        user.setUserInfo(res.name, res.about, res.avatar);
        return res.avatar
      })
      .then((res) => {
        user.setUserInfo(formValues.name, formValues.job, res);
        editForm.close();
      })
      .then(() => {
        editForm.renderLoading(false);
      });
  },
});

editForm.setEventListener();

const avatarForm = new PopupWithForm("#avatar-popup", {
  callback: (formValues) => {
    apiRes
      .patchAvatar(formValues.avatar)
      .then((res) => {
        user.setUserInfo(res.name, res.about, res.avatar);
        avatarForm.close();
        avatarFormValid.toggleButtonState();
      })
      .then(() => {
        avatarForm.renderLoading(false);
      });
  },
});
avatarForm.setEventListener();

const popupWithImage = new PopupWithImage("#image-popup");
const popupWithSubmit = new PopupWithSubmit("#submit-popup", (card, idCard) => {
  apiRes
    .deleteMethod(idCard)
    .then(() => {
      card.deleteCard();
      popupWithSubmit.close();
    })
    .then(() => {
      popupWithSubmit.renderLoading(false);
    });
});

const addForm = new PopupWithForm("#add-popup", {
  callback: (formValues) => {
    const nameCard = formValues.place;
    const linkImg = formValues.link;
    const newItem = {
      name: nameCard,
      link: linkImg,
    };
    apiRes
      .postCard(nameCard, linkImg)
      .then((res) => {
        const newCard = createCard(res);
        cardList.addItem(newCard);
        addForm.close();
        addFormValid.toggleButtonState();
      })
      .then(() => {
        addForm.renderLoading(false);
      });
  },
});

addForm.setEventListener();

// ОТРИСОВЫВАЕМ СТРАНИЦУ
Promise.all([
  //в Promise.all передаем массив промисов которые нужно выполнить

  apiRes.getMethodUser(),

  apiRes.getMethodCards(),
])

  .then((values) => {
    //попадаем сюда когда оба промиса будут выполнены

    console.log(values);
    const renderingUser = (us) => {
      user.setUserInfo(us.name, us.about, us.avatar);
      ownerId = us._id;
    };
    renderingUser(values[0]);

    const renderingCard = (masCards) => {
      cardList.renderItems(masCards);
    };
    renderingCard(values[1]);
    // у нас есть все нужные данные, отрисовываем страницу
  })

  .then(() => {
    editOpenPopupEl.addEventListener("click", () => {
      editForm.open();
      const userInform = user.getUserInfo();
      nameInputEl.value = userInform.name;
      jobInputEl.value = userInform.job;
    });

    avatarOpenPopupEl.addEventListener("click", () => {
      avatarForm.open();
    });

    addOpenPopupEl.addEventListener("click", () => {
      addForm.open();
    });
  })

  .catch((err) => {
    //попадаем сюда если один из промисов завершатся ошибкой

    console.log(err);
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
        apiRes.removeLike(id).
        then((res) => {
          card.likeCard(res.likes.length);
        });
      } else {
        apiRes.putLike(id).
        then((res) => {
          card.likeCard(res.likes.length);
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
