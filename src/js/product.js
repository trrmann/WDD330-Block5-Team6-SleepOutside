import { addToCartHandler, getCartCount } from './cart.js';
import ProductData from './ProductData.mjs';

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

  const image = document.querySelector('#product-image');
  image.src = product.Image;
  image.alt = product.Name;

  document.querySelector('#product-price').textContent =
    `$${product.FinalPrice.toFixed(2)}`;
  document.querySelector('#product-color').textContent =
    product.Colors[0].ColorName;
  document.querySelector('#product-description').innerHTML =
    product.DescriptionHtmlSimple;

  document.querySelector('#addToCart').dataset.id = product.Id;
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
}

init();
