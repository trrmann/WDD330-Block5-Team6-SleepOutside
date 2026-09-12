import { addToCartHandler, getCartCount } from './cart.js';
import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';
import { getParam } from './utils.mjs';

function updateCartCount() {
  const cartCount = document.querySelector('#cart-count');
  if (cartCount) {
    cartCount.textContent = getCartCount();
  }
}

async function init() {
  const productId = getParam('product');
  const dataSource = new ProductData('tents');

  const product = new ProductDetails(productId, dataSource);

  await product.init();

  updateCartCount();

  document
    .getElementById('addToCart')
    .addEventListener('click', async (event) => {
      await addToCartHandler(event, dataSource);
      updateCartCount();
    });
}

//intialize webpage
init();
