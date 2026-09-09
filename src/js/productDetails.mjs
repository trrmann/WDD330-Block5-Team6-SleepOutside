



export default class ProductDetails{
    
    constructor(productId, dataSource){
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
        // the product details are needed before rendering the HTML
        // once the HTML is rendered, add a listener to the Add to Cart button
        // Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on 'this' to understand why.
        document.getElementById('addToCart')
        .addEventListener('click', this.addProductToCart.bind(this));

        //.addEventListener('click', this.addToCart.bind(this));

        renderProductDetails();

    }

    addProductToCart(product) {
        const cartItems = getLocalStorage('so-cart') || []; // get cart array of items from local storage if null set to empty array
        cartItems.push(product);
        setLocalStorage('so-cart', cartItems);
    }

    renderProductDetails(){
        const section = document.getElementsByClassName("product-detail");
        
        section.innerHTML = f```
        <h3>Cedar Ridge</h3>

        <h2 class="divider">  </h2>

        <img
          class="divider"
          src="../images/tents/cedar-ridge-rimrock-tent-2-person-3-season-in-rust-clay~p~344yj_01~320.jpg"
          alt="Rimrock Tent - 2-Person, 3-Season"
        />

        <p class="product-card__price">$69.99</p>

        <p class="product__color">Rust/Clay</p>

        <p class="product__description">
          Lightweight and ready for adventure, this Cedar Ridge Rimrock tent
          boasts a weather-ready design that includes a tub-style floor and
          factory-sealed rain fly
        </p>

        <div class="product-detail__add">
          <button id="addToCart" data-id="344YJ">Add to Cart</button>
        </div>
        ```;
    }


}