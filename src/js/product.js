import { addToCartHandler, getCartCount } from './cart.js';
import ProductData from './ProductData.mjs';

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
  image.src = product.Images.PrimarySmall;
  image.srcset =
    product.Images.PrimarySmall +
    ' 80w, ' +
    product.Images.PrimaryMedium +
    ' 160w, ' +
    product.Images.PrimaryLarge +
    ' 320w, ' +
    product.Images.PrimaryExtraLarge +
    ' 600w';
  image.sizes =
    '(max-width: 120px) 80px, (max-width: 240px) 160px, (max-width: 380px) 320px, 600px';
  image.alt = 'Image of ' + product.Name;
  image.loading = 'lazy';
  image.width = '600';

  document.querySelector('#product-price').textContent =
    `$${product.FinalPrice.toFixed(2)}`;
  document.querySelector('#product-color').textContent =
    product.Colors[0].ColorName;
  document.querySelector('#product-description').innerHTML =
    product.DescriptionHtmlSimple;

  document.querySelector('#addToCart').dataset.id = product.Id;
}

async function init() {
  const category = new URLSearchParams(window.location.search).get('category');
  const productId =
    new URLSearchParams(window.location.search).get('product') ||
    document.querySelector('#addToCart')?.dataset.id;
  const dataSource = new ProductData(category);
  const product = await dataSource.findProductById(category, productId);

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
      await addToCartHandler(event, dataSource, category);
      updateCartCount();
    });
}

init();
