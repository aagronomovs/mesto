export default class Section {
    constructor({
       // items,
        renderer
    }, containerSelector) {
        //this._items = items;
        this._renderer = renderer;
        this._container = containerSelector;
    }

    addItem(element, method) {
        this._container[method](element);
    }

    renderItems(items) {
        items.forEach((item) => this._renderer(item));
    }
}