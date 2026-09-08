export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.init();
  }
  async init() {
    const list = await this.dataSource.getData();
    this.renderList(this.productCardTemplate.bind(this), this.listElement, list);
  }
  productCardTemplate(product) {
    return `
    <li class="product-card">
      <a href="product_pages/?product=${product.id}">
        <img src="${product.card__image}" alt="Image of ${product.name}" class="card__image" />
        <h2 class="card__brand">${product.brand}</h2>
        <h3 class="card__name">${product.name}</h3>
        <p class="product-card__price">$${product.price.toFixed(2)}</p>
      </a>
    </li>
    `;
  }
  renderList(templateFn, parentElement, list, position = 'afterbegin', clear = false) {
    const htmlListItems = list.map((product) => templateFn(product));
    if (clear) {
      parentElement.innerHTML = '';
    }
    parentElement.insertAdjacentHTML(position, htmlListItems.join(''));
  };
}
