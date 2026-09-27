import { getCartItems } from './cart.js';
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
    // convert the form data to a json object using the formDataToJSON function
   try {
      const jsonData = formDataToJSON(form);
      
      const orderDate  = new Date();
      //Check if card is expired
      const expiration = new Date(jsonData.expiration);
      if(orderDate > expiration){
        console.log('Card has Expired');
        throw new Error('Card has Expired');
      };



      // populate the JSON order with the order Date, orderTotal, tax, shipping, and list of items
      jsonData['items'] = packageItems();
      jsonData['orderDate'] = orderDate.toISOString();
      jsonData['orderTotal'] = this.orderTotal.toFixed(2);
      jsonData['tax'] = this.tax.toFixed(2);
      jsonData['shipping'] = this.shipping.toFixed(2);

      // call the checkout method in the ExternalServices modules and send it the JSON order data.
      const services = new ExternalServices();
      return response = await services.checkout(jsonData);
      
    } catch (err) {
      return err;
    }
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
