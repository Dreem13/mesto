export default class Section {
  constructor ({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
    this._containerSection = document.querySelector(this._containerSelector);
  }

  getElement () {
    this._renderer(this._items);
    }

  addItem (item) {
    this._containerSection.prepend(item);
   }

}
