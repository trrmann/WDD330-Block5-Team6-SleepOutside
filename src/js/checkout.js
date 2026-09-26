import CheckoutProcess from './CheckoutProcess.mjs';
import { renderCartContents, updateCartCount, getCartItems } from './cart.js';
import { loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();

const checkout = new CheckoutProcess();
checkout.init();

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
  const zip = document.querySelector('#zip');
  const alertBanner = document.querySelector('#validation-alert');

  zip.addEventListener('change', () => {
    checkout.calculateOrderTotal();
  });

  const form = document.getElementById('checkout-form');

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
      checkout.checkout(form);
    }
  });
});

if (document.querySelector('#cart-list')) {
  renderCartContents();
} else {
  updateCartCount();
}
