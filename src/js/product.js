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

  renderProduct(product);
  document
    .getElementById('addToCart')
    .addEventListener('click', (event) => addToCartHandler(event, dataSource));


init();
