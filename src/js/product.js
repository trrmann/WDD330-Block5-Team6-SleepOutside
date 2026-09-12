import { addToCartHandler, getCartCount } from './cart.js';
import ProductData from './ProductData.mjs';
import { setLocalStorage, getLocalStorage, getParam } from './utils.mjs';
import ProductData from './productData.mjs';
import ProductDetails from './productDetails.mjs';

const productId = getParam('product');
const dataSource = new ProductData('tents');

function updateCartCount() {
  const cartCount = document.querySelector('#cart-count');
  if (cartCount) {
    cartCount.textContent = getCartCount();
  }
}

function renderProduct(product) {
  document.title = `Sleep Outside | ${product.Name}`;
  document.querySelector('#product-brand').textContent = product.Brand.Name;
  document.querySelector('#product-name').textContent =
    product.NameWithoutBrand;
const product = new ProductDetails(productId, dataSource);

product.init();

function addProductToCart(addedProduct) {
  const cartItems = getLocalStorage('so-cart') || []; // get cart array of items from local storage if null set to empty array
  cartItems.push(addedProduct);
  setLocalStorage('so-cart', cartItems);
}

async function init() {
  const productId =
    new URLSearchParams(window.location.search).get('product') ||
    document.querySelector('#addToCart')?.dataset.id;
  const product = await dataSource.findProductById(productId);

  if (!product) {
    document.querySelector('.product-detail').textContent =
      'Product not found.';
    return;
  }

  renderProduct(product);
  updateCartCount();
  document
    .getElementById('addToCart')
    .addEventListener('click', async (event) => {
      await addToCartHandler(event, dataSource);
      updateCartCount();
    });
// add to cart button event handler
async function addToCartHandler(e) {
  const cartProduct = await dataSource.findProductById(e.target.dataset.id);
  //enter product ID as key and product its`elf as value
  addProductToCart(cartProduct);
}

renderProduct(product);
document
  .getElementById('addToCart')
  .addEventListener('click', (event) => addToCartHandler(event, dataSource));

init();
