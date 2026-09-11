import { setLocalStorage, getLocalStorage, getParam } from './utils.mjs';
import ProductData from './productData.mjs';
import ProductDetails from './productDetails.mjs';

const productId = getParam('product');
const dataSource = new ProductData('tents');

const product = new ProductDetails(productId, dataSource);

product.init();

function addProductToCart(addedProduct) {
  const cartItems = getLocalStorage('so-cart') || []; // get cart array of items from local storage if null set to empty array
  cartItems.push(addedProduct);
  setLocalStorage('so-cart', cartItems);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const cartProduct = await dataSource.findProductById(e.target.dataset.id);
  //enter product ID as key and product its`elf as value
  addProductToCart(cartProduct);
}

// add listener to Add to Cart button
document
  .getElementById('addToCart')
  .addEventListener('click', addToCartHandler);

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
