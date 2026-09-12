import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { getCartCount } from './cart.js';

const productListElement = document.querySelector('.product-list');
const category = 'tents';
const productData = new ProductData(category);
const productList = new ProductList(category, productData, productListElement);

productList.init();

document.querySelector('#cart-count').textContent = getCartCount();
