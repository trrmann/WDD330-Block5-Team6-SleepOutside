import { getLocalStorage, setLocalStorage } from './utils.mjs';
import ProductData from './ProductData.mjs';

const dataSource = new ProductData('tents');

function getCartItems() {
  const cartItems = getLocalStorage('so-cart');
  if (
    cartItems !== null &&
    typeof cartItems === 'object' &&
    !Array.isArray(cartItems)
  ) {
    return cartItems;
  }

  const cart = {};
  if (cartItems !== null) {
    setLocalStorage('so-cart', cart);
  }
  return cart;
}

function addProductToCart(product) {
  const cartItems = getCartItems();
  const productKey = product.Id;
  if (productKey in cartItems) {
    cartItems[productKey].quantity += 1;
  } else {
    cartItems[productKey] = {
      product: product,
      quantity: 1,
    };
  }
  setLocalStorage('so-cart', cartItems);
}
function removeProductFromCart(product) {
  const cartItems = getCartItems();
  const productKey = product.Id;
  if (productKey in cartItems) {
    cartItems[productKey].quantity -= 1;
    if (cartItems[productKey].quantity <= 0) {
      delete cartItems[productKey];
    }
  }
  setLocalStorage('so-cart', cartItems);
}
// add to cart button event handler
export async function addToCartHandler(event, productDataSource) {
  const product = await productDataSource.findProductById(
    event.target.dataset.id,
  );
  //enter product ID as key and product its`elf as value
  addProductToCart(product);
  if (document.querySelector('.product-list')) {
    renderCartContents();
  }
}
export async function removeFromCartHandler(event, productDataSource) {
  const product = await productDataSource.findProductById(
    event.target.dataset.id,
  );
  //enter product ID as key and product its`elf as value
  removeProductFromCart(product);
  if (document.querySelector('.product-list')) {
    renderCartContents();
  }
}
export function clearCart() {
  setLocalStorage('so-cart', {});
}
export function getCartProductCount() {
  const cartItems = getCartItems();
  return Object.keys(cartItems).length;
}
export function getCartCount() {
  const cartItems = getCartItems();
  let count = 0;
  for (const key in cartItems) {
    count += cartItems[key].quantity;
  }
  return count;
}

function renderCartContents() {
  const cartItems = getCartItems();
  const htmlItems = Object.values(cartItems).map((item) =>
    cartItemTemplate(item),
  );
  document.querySelector('.product-list').innerHTML = htmlItems.join('');
  document.querySelectorAll('[data-action="add"]').forEach((button) => {
    button.addEventListener('click', (event) =>
      addToCartHandler(event, dataSource),
    );
  });
  document.querySelectorAll('[data-action="remove"]').forEach((button) => {
    button.addEventListener('click', (event) =>
      removeFromCartHandler(event, dataSource),
    );
  });
}
function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.product.Image}"
      alt="${item.product.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.product.Name}</h2>
  </a>
  <p class="cart-card__color">${item.product.Colors[0].ColorName}</p>
  <div class="cart-card__quantity">
    <button type="button" data-action="remove" data-id="${item.product.Id}" aria-label="Remove one ${item.product.Name}">-</button>
    <span>qty: ${item.quantity}</span>
    <button type="button" data-action="add" data-id="${item.product.Id}" aria-label="Add one ${item.product.Name}">+</button>
  </div>
  <p class="cart-card__price">$${item.product.FinalPrice.toFixed(2)}</p>
  <p class="cart-card__total-label">total:</p>
  <p class="cart-card__total">$${(item.product.FinalPrice * item.quantity).toFixed(2)}</p>
</li>`;

  return newItem;
}

if (document.querySelector('.product-list')) {
  renderCartContents();
}

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
