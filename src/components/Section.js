export default class Section {

  constructor({renderer}, container) {
    this._renderer = renderer;
    this._container = container;
  }

  addItem(item) {
    const card = this._renderer(item);
    this._container.prepend(card);
  }

  renderItems(items) {
    items.forEach(item => {
      this.addItem(item);
    });
  }
}
