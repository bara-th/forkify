import View from './view';

class SearchView extends View {
  _paraentElement = document.querySelector('.search');

  getQuery() {
    const query = this._paraentElement.querySelector('.search__field').value;
    this.#clearInput();
    return query;
  }

  #clearInput() {
    this._paraentElement.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    this._paraentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
