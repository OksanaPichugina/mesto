export default class Section {
  constructor({ renderer }, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }
  //принимает параметр element и вставляет его в контейнер методом append
  addItem(element) {
    this._container.append(element);
  }

  clear() {
    this._container.innerHTML = "";
  }
  //перебирает массив данных . Вызывает для каждого элемента массива метод addItem.
  renderItems(items) {
    //this.clear();
    items.forEach((item) => {
      this._renderer(item);
    });
  }
}
