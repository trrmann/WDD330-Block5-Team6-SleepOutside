import { renderCartContents, updateCartCount, getCartItems } from './cart.js';
import { getLocalStorage } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';

export default class CheckoutProcess {
  constructor(key = 'so-cart', outputSelector = 'span') {
    // --- CALCULATING METRIC CONSTANTS & TOTAL CONTEXTS ---
    this.TAX_RATE = 0.06; // 6% Localized Tax Rate Structure
    this.SHIPPING_BASE_COST = 8.00;
    this.SHIPPING_UNIT_COST = 2.00
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = {};
    this.itemTotal = 0;
    this.itemCount = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }
  init() {
    this.list = getLocalStorage(this.key);
    this.calculateOrderTotal();
  }

  calculateItemSubTotal() {
    // calculate and display the total dollar amount of the items in the cart, and the number of items.
    const itemsArray = Object.values(this.list);
    this.itemTotal = itemsArray.reduce((total, item) => (total + (item.quantity * item.product.FinalPrice)), 0);
    this.itemCount = itemsArray.reduce((total, item) => (total + item.quantity), 0);
  }

  calculateTax() {
    this.tax = this.itemTotal * this.TAX_RATE;
  }

  calculateShipping() {
    this.shipping = this.SHIPPING_BASE_COST + (this.itemCount * this.SHIPPING_UNIT_COST);
  }

  calculateOrderTotal() {
    this.calculateItemSubTotal();
    // calculate the tax and shipping amounts.  Add those to the cart total to figure out the order total.
    this.calculateTax();
    this.calculateShipping();
    this.orderTotal = this.itemTotal + this.tax + this.shipping;

    // display the totals.
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    // once the totals are all calculated display them in the order summary page.
    //const subTotal = document.querySelector(`${this.outputSelector} #checkout-subtotal`);
    //const tax = document.querySelector(`${this.outputSelector} #checkout-tax`);
    //const shipping = document.querySelector(`${this.outputSelector} #checkout-shipping`);
    //const total = document.querySelector(`${this.outputSelector} #checkout-total`);
    const subTotal = document.querySelector('#checkout-subtotal');
    const tax = document.querySelector('#checkout-tax');
    const shipping = document.querySelector('#checkout-shipping');
    const total = document.querySelector('#checkout-total');

    subTotal.innerText = `$${this.itemTotal.toFixed(2)}`;
    tax.innerText = `$${this.tax.toFixed(2)}`;
    shipping.innerText = `$${this.shipping.toFixed(2)}`;
    total.innerText = `$${this.orderTotal.toFixed(2)}`;
  }
  async checkout(form) {
    // get the form element data by the form name
    // convert the form data to a json object using the formDataToJSON function
    const jsonData = formDataToJSON(form);

   // populate the JSON order with the order Date, orderTotal, tax, shipping, and list of items
   jsonData['items'] = packageItems();
   jsonData['orderDate'] = new Date().toISOString();
   jsonData['orderTotal'] = Number(document.querySelector('#checkout-total').innerText);
   jsonData['tax'] = Number(document.querySelector('#checkout-tax').innerText);
   jsonData['shipping'] = Number(document.querySelector('#checkout-shipping').innerText);
   // call the checkout method in the ExternalServices modules and send it the JSON order data.
   const services = new ExternalServices();
   services.checkout(jsonData);
  }
}

// takes the items currently stored in the cart (localStorage) and returns them in a simplified form.
function packageItems(/*item*/) {
  // convert the list of products from localStorage to the simpler form required for the checkout process.
  // an array.map would be perfect for this process.
  const products = getCartItems();
  const productKeys = Object.keys(products);
  const packagedItems = productKeys.map((productKey) => {
    const product = products[productKey];
    return {
      id: product.product.Id,
      name: product.product.Name,
      price: product.product.FinalPrice,
      quantity: product.quantity
    };
  });
  return packagedItems;
}

function formDataToJSON(formElement) {
  const formData = new FormData(formElement);
  const convertedJSON = {};
  formData.forEach((value,key) => {
    convertedJSON[key] = value;
  });
  return convertedJSON;
}

// Ensure script operations process safely after elements construct in the active tree
document.addEventListener('DOMContentLoaded', () => {
  // --- CORE BLUEPRINT & DYNAMIC INJECTION TARGET ELEMENTS ---
  const template = document.querySelector('#checkout-product-item-template');
  const container = document.querySelector('.checkout-product-list');

  const products = getCartItems();
  const productKeys = Object.keys(products);

  // Process data collection structures against HTML5 template targets

  productKeys.forEach((productKey) => {
    const product = products[productKey];
    // Deep clone the content layer segment fragment node
    const clone = template.content.cloneNode(true);

    // Perform individual node calculation tracking operations
    const itemSubtotal = product.product.FinalPrice * product.quantity;

    // Direct mapping configuration mapping internal keys cleanly to content targets
    clone.querySelector('.product-name').textContent = product.product.Name;
    clone.querySelector('.item-price').textContent =
      `$${product.product.FinalPrice.toFixed(2)}`;
    clone.querySelector('.item-quantity').textContent = product.quantity;
    clone.querySelector('.item-subtotal').textContent =
      `$${itemSubtotal.toFixed(2)}`;

    // Append cloned tree node layout instantly to production live viewport
    container.appendChild(clone);
  });

  // --- VALIDATION ERROR INTERACTION LOGIC LAYER ---
  const form = document.querySelector('#checkout-form');
  const zip = document.querySelector('#zip');
  const alertBanner = document.querySelector('#validation-alert');

  zip.addEventListener('change', () => {
    checkout.calculateOrderTotal();
  });

  form.addEventListener('submit', (event) => {
    // Native Constraint Verification validation execution intercept
    if (!form.checkValidity()) {
      event.preventDefault(); // Halt active form action execution lifecycle

      // Enforce the visual validation CSS highlight selectors
      form.classList.add('submitted');

      // Render layout notice alerts visible to context viewports
      alertBanner.classList.add('visible');

      // Automatically pull focus directly onto the very first failed input node element
      const firstInvalidInput = form.querySelector('input:invalid');
      if (firstInvalidInput) {
        firstInvalidInput.focus();
      }
    } else {
      // Success condition path state transitions
      alertBanner.classList.remove('visible');
      alert('Order submitted successfully!');
      // Execute your specific checkout logic actions here (e.g. Fetch API Post payloads)
    }
  });
});

if (document.querySelector('#cart-list')) {
  renderCartContents();
} else {
  updateCartCount();
}

const checkout = new CheckoutProcess();
checkout.init();
