export default class Section {
  constructor ({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  getElement () {
     this._items.forEach((item) => {
          this._renderer(item, this._container); // или оставить один item?
    });
  }

  addItem (item) {
  //   this._renderer(item, this._container); 1
         this._container.prepend(item);
   }

}
