export default class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  getMethod() {
    return fetch(this._url, {
      method: "GET",
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        throw new Error("Что-то пошло не так");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  postCard(name, link) {
    return fetch(this._url, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        throw new Error("Что-то пошло не так");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  patchMethod(name, about) {
    return fetch(this._url, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        throw new Error("Что-то пошло не так");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  patchAvatar(avatar) {
    return fetch(`${this._url}/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        throw new Error("Что-то пошло не так");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteMethod(id) {
    return fetch(`${this._url}/${id}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Что-то пошло не так");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  putLike(id) {
    return fetch(`${this._url}/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json(); //вернется одна обновленная карточка
        }
        throw new Error("Что-то пошло не так");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  removeLike(id) {
    return fetch(`${this._url}/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json(); //вернется одна обновленная карточка
        }
        throw new Error("Что-то пошло не так");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
