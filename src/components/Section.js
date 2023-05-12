export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._containerSelector = document.querySelector(containerSelector);
    this._renderer = renderer;
    this._renderedItems = items;
  }

  addItem(item) {
    this._containerSelector.prepend(item);
  }

  clear() {
    this._containerSelector.innerHTML = '';
  }

  renderItems() {

    this.clear();
    
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }
}
