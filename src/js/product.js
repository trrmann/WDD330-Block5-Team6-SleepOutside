import { addToCartHandler, getCartCount } from './cart.js';
import ExternalServices from './ExternalServices.mjs';
import ProductDetails from './ProductDetails.mjs';
import { getParam, loadHeaderFooter } from './utils.mjs';

function updateCartCount() {
  const cartCount = document.querySelector('#cart-count');
  if (cartCount) {
    cartCount.textContent = getCartCount();
  }
}

async function init() {
  await loadHeaderFooter();

  const productId = getParam('product');
  const dataSource = new ExternalServices('tents');

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
