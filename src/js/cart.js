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

function updateCartCount() {
  const cartCount = document.querySelector('#cart-count');
  if (cartCount) {
    cartCount.textContent = getCartCount();
  }
}

function renderCartContents() {
  const cartItems = getCartItems();
  const htmlItems = Object.values(cartItems).map((item) =>
    cartItemTemplate(item),
  );
  document.querySelector('#cart-list').innerHTML = htmlItems.join('');
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
  updateCartCount();

  //render the total price of all items in the cart
  renderGrandTotal();
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
  <p class="cart-card__total-label">Subtotal:</p>
  <p class="cart-card__total">$${(item.product.FinalPrice * item.quantity).toFixed(2)}</p>
</li>`;

  return newItem;
}

function calculateGrandTotal(cartItems) {
  /**
   * Calculates the grand total price of all of the items in the cart
   */

  let total = 0;

  Object.keys(cartItems).forEach((key) => {
    const value = cartItems[key];
    //get the final price of the product in the cart and convert it to float, so it can be added to the total
    let price = value.product.FinalPrice;

    total += parseFloat(parseInt(value.quantity) * price);
  });

  return total.toFixed(2);
}

function renderGrandTotal() {
  const cartItems = getCartItems();
  if (Object.keys(cartItems).length === 0) {
    //if no items hide grand total
    document.querySelector('.cart-footer-hide').style.display = 'none';
  } else {
    document.querySelector('#cart-total-display').innerHTML =
      `<strong>Total: $${calculateGrandTotal(cartItems)}</strong>`;
  }
}

if (document.querySelector('#cart-list')) {
  renderCartContents();
} else {
  updateCartCount();
}
