import { addToCartHandler } from './cart.js';
import ShoppingCart from './shoppingCart.mjs';
import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';
import { getParam } from './utils.mjs';
import { loadHeaderFooter } from './utils.mjs';
/*function updateCartCount() {
  const cartCount = document.querySelector('#cart-count');
  if (cartCount) {
    cartCount.textContent = ShoppingCart.getCartCount();
  }
}*/
async function init() {
  const productId = getParam('product');
  const dataSource = new ProductData('tents');

  const product = new ProductDetails(productId, dataSource);

  await product.init();

  //updateCartCount();

  document
    .getElementById('addToCart')
    .addEventListener('click', async (event) => {
      await addToCartHandler(event, dataSource);
      const cart = new ShoppingCart();
      cart.init();
    });
}

//intialize webpage
init();
loadHeaderFooter();
