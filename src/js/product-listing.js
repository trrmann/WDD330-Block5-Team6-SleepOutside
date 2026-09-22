import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { getCartCount } from './cart.js';

const productListElement = document.querySelector('.product-list');
const categoryElement = document.querySelector('#category');

const category = new URLSearchParams(window.location.search).get('category');

switch (category) {
  case 'tents':
    categoryElement.textContent = 'Tents';
    break;
  case 'backpacks':
    categoryElement.textContent = 'Backpacks';
    break;
  case 'hammocks':
    categoryElement.textContent = 'Hammocks';
    break;
  default:
    // sleeping-bags
    categoryElement.textContent = 'Sleeping Bags';
}

const productData = new ProductData(category);

const productList = new ProductList(category, productData, productListElement);

productList.init();

document.querySelector('#cart-count').textContent = getCartCount();
0;
