import { addToCartHandler, getCartCount } from './cart.mjs';
import ExternalServices from './ExternalServices.mjs';
import ProductDetails from './ProductDetails.mjs';
import { getParam, loadHeaderFooter, alertMessage } from './utils.mjs';
import addBreadcrumbs from './breadcrumb.mjs';

function updateCartCount() {
  const cartCount = document.querySelector('#cart-count');
  if (cartCount) {
    cartCount.textContent = getCartCount();
  }
}

async function init() {
  const productId = getParam('product');
  const dataSource = new ExternalServices();

  const product = new ProductDetails(productId, dataSource);

  await product.init();

  updateCartCount();

  document
    .getElementById('addToCart')
    .addEventListener('click', async (event) => {
      alertMessage('Item added to cart');
      await addToCartHandler(event, dataSource);
      updateCartCount();
    });

  loadHeaderFooter();
  addBreadcrumbs();
}

//intialize webpage
init();
