export class Section {
    constructor({items,renderer}, selector) {
        this._items = items;
        this._renderer = renderer;
        this._selector = selector;
        this._container = document.querySelector(this._selector);
    }

    renderItems() {
        this._items.forEach(item => {
            this._renderer(item); // вызываем renderer, передав item
        });
    }

    addItem(element) {
        this._container.append(element);
    }
}