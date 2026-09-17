import { getCartItems, addToCartHandler, removeFromCartHandler } from './cart.js';
export default class ShoppingCart {
    constructor(cartListId = null) {
        this.cartListId = cartListId;
        this.cartItems = {};
    }
    init() {
        this.cartItems = getCartItems();
        this.renderCartContents();

    }

    renderCartContents() {
        if (this.cartListId === null) { this.updateCartCount(); } else {
            const htmlItems = Object.values(this.cartItems).map((item) =>
                this.cartItemTemplate(item)
            );
            const cartItemshtml = htmlItems.join('');
            const cartlistElement = document.querySelector(this.cartListId);
            cartlistElement.innerHTML = cartItemshtml;
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
            this.updateCartCount();

            //render the total price of all items in the cart
            this.renderGrandTotal();
        }
    }
    calculateGrandTotal(cartItems) {
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

    renderGrandTotal() {
        const cartItems = this.getCartItems();
        if (Object.keys(cartItems).length === 0) {
            //if no items hide grand total
            document.querySelector('.cart-footer-hide').style.display = 'none';
        } else {
            document.querySelector('#cart-total-display').innerHTML =
                `<strong>Total: $${this.calculateGrandTotal(this.cartItems)}</strong>`;
        }
    }
    cartItemTemplate(item) {
        const newItem =
            `<li class="cart-card divider">
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
    getCartCount() {
        let count = 0;
        for (const key in this.cartItems) {
            count += this.cartItems[key].quantity;
        }
        return count;
    }

    updateCartCount() {
        const cartCount = document.querySelector('#cart-count');
        if (cartCount) {
            cartCount.textContent = this.getCartCount();
        }
    }

}


