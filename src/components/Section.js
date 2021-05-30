export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._itemsArr = items;
        this._renderer = renderer;
        this._containerSelector = containerSelector;
        this._containerSection = document.querySelector(this._containerSelector);
    }

    render() {
        // this._renderer(this._items);
        this._itemsArr.reverse().forEach(item => this._renderer(item))
    }

    addItem(item) {
        this._containerSection.prepend(item);
    }
}
