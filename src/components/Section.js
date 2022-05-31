export default class Section {

  constructor({items, renderer}, container) {
    this._items = items;
    this._renderer = renderer;
    this._container = container;
  }

  _addItem(item) {
    this._container.prepend(item);
  }

  renderItems() {
    this._items.forEach(item => {
      const renderedItem = this._renderer(item);
      this._addItem(renderedItem);
    });
  }
}
