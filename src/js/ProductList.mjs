export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }
  async init() {
    const list = await this.dataSource.getData(this.category);
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
      <a href="/product_pages/?category=${this.category}&product=${product.Id}">
        <img src="${product.Images.PrimarySmall}"
          srcset="${product.Images.PrimarySmall} 80w,
            ${product.Images.PrimaryMedium} 160w,
            ${product.Images.PrimaryLarge} 320w,
            ${product.Images.PrimaryExtraLarge} 600w"
          sizes="(max-width: 120px) 80px,
            (max-width: 240px) 160px,
            (max-width: 380px) 320px,
            600px"
          alt="Image of ${product.Name}" class="card__image"
          loading="lazy"
          width="600" />
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
