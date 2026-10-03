import ExternalServices from './ExternalServices.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';
import AlertDisplay from './alert.mjs';
import addBreadcrumbs from './breadcrumb.mjs';

function setTopProductHeader(category, sortby) {
  let altSortBy = 'price';
  if (sortby === 'price') {
    altSortBy = 'name';
  }
  //capitalize the first letter of the name of the product
  let product = `${category[0].toUpperCase()}${category.slice(1)}`;
  product = product.replaceAll('-', ' ');
  document.getElementById('top-product-header').innerHTML =
    `Top Products: ${product} by <a href="/product_listing/index.html?category=${category}&by=${altSortBy}" class="sort-by">${altSortBy}</a>`;
}

loadHeaderFooter();

async function init() {
  const category = getParam('category');
  const sortby = getParam('by') ?? 'name';
  setTopProductHeader(category, sortby);
  // first create an instance of the ProductData class.
  const dataSource = new ExternalServices();
  // then get the element you want the product list to render in
  const listElement = document.querySelector('.product-list');
  // then create an instance of the ProductList class and send it the correct information.
  const myList = new ProductList(category, dataSource, listElement, sortby);
  // finally call the init method to show the products
  await myList.init();

  const alert = new AlertDisplay();
  await alert.init();

  //addbread crumbs must always occur after alerts
  addBreadcrumbs();
}

init();
