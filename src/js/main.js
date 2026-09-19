import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import ShoppingCart from './shoppingCart.mjs';
import { loadHeaderFooter } from './utils.mjs';

const productListElement = document.querySelector('.product-list');
const category = 'tents';
const productData = new ProductData(category);
const productList = new ProductList(category, productData, productListElement);
const cart = new ShoppingCart();
productList.init();
cart.init();
//document.querySelector('#cart-count').textContent = cart.getCartCount();

loadHeaderFooter();
