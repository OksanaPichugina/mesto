export default class Section {
    constructor ({items,renderer},selector){
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(selector);
    }
    //принимает параметр element и вставляет его в контейнер методом append
    addItem(element) {
        this._container.append(element);
    }
    
    clear() {
        this._container.innerHTML = '';
    }
    //перебирает массив данных . Вызывает для каждого элемента массива метод addItem.
    renderItems() {
        //this.clear();
        this._items.forEach(item => {
          this._renderer(item);
        });
    }
}