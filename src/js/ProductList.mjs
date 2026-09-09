export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }
  async init() {
    const list = await this.dataSource.getData();
    this.renderList(
      this.productCardTemplate.bind(this),
      this.listElement,
      list,
      'afterbegin',
      true,
    );
  }
  productCardTemplate(product) {
    return `
    <li class="product-card">
      <a href="product_pages/?product=${product.Id}">
        <img src="${product.Image}" alt="Image of ${product.Name}" class="card__image" />
        <h2 class="card__brand">${product.Brand.Name}</h2>
        <h3 class="card__name">${product.NameWithoutBrand}</h3>
        <p class="product-card__price">$${product.FinalPrice.toFixed(2)}</p>
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
