import { getLocalStorage, setLocalStorage } from './utils.mjs';
import ProductData from './ProductData.mjs';

const dataSource = new ProductData('tents');

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

function addProductToCart(product) {
  const cartItems = getLocalStorage('so-cart') || []; // get cart array of items from local storage if null set to empty array
  cartItems.push(product);
  setLocalStorage('so-cart', cartItems);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  //enter product ID as key and product its`elf as value
  addProductToCart(product);
}

async function init() {
  const productId = new URLSearchParams(window.location.search).get('product');
  const product = await dataSource.findProductById(productId);

  if (!product) {
    document.querySelector('.product-detail').textContent =
      'Product not found.';
    return;
  }

  renderProduct(product);
  document
    .getElementById('addToCart')
    .addEventListener('click', addToCartHandler);
}

init();

//Changelog: Zachary P Newby
//9.5.26
/**
 * I created my own solution but implemented the example one to prevent conflicts*/

/*
function addProductToCart(productKey,product) {
  
 *  Adds an item to the cart, storing cart contents in localStorage
 * @param {string} productKey the value to be used as the key to find the product
 * @param {object} product the product to be stored in the cart
 * 
  setLocalStorage(productKey, product);
}

// add to cart button event handler
async function addToCartHandler(e) {
  
  const product = await dataSource.findProductById(e.target.dataset.id);
  //enter product ID as key and product itself as value
  addProductToCart(product["Id"], product);
}
*/
