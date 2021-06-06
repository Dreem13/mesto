export default class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._containerSelector = containerSelector;
        this._containerSection = document.querySelector(this._containerSelector);
    }

    render(items) {
        items.reverse().forEach(item => this._renderer(item));
    }

    addItem(item) {
        this._containerSection.prepend(item);
    }
}
