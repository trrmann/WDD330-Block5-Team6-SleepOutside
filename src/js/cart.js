import { renderCartContents, updateCartCount } from './cart.mjs';
import { loadHeaderFooter } from './utils.mjs';
import addBreadcrumbs from './breadcrumb.mjs';

loadHeaderFooter();
addBreadcrumbs();

if (document.querySelector('#cart-list')) {
  renderCartContents();
} else {
  updateCartCount();
}

if (
  document.querySelector('#cart-count') &&
  document.querySelector('.checkout-button')
) {
  const count = Number(document.querySelector('#cart-count').textContent);
  if (count <= 0) {
    document.querySelector('.checkout-button').style.display = 'none';
  } else {
    document.querySelector('.checkout-button').style.display = 'inline-block';
  }
}
