import {getLocalStorage, setLocalStorage} from './utils.mjs';

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
        
        
        //get product details from data source, find product by ID
        this.product = await this.dataSource.findProductById(this.productId);


        //Code used to iterate through and view product data
        Object.keys(this.product).forEach(key => {
        console.log(key, this.product[key]);
        });
        
        this.renderProductDetails(this.product);


        document.getElementById('addToCart').addEventListener('click', this.addProductToCart.bind(this));
    }

    addProductToCart(product) {
        const cartItems = getLocalStorage('so-cart') || []; // get cart array of items from local storage if null set to empty array
        cartItems.push(product);
        setLocalStorage('so-cart', cartItems);
    }

    renderProductDetails(product){
        
        const sectionTemplate = document.getElementById("productDetailTemplate");
        const main = document.getElementById("main");

        const clone = sectionTemplate.content.cloneNode(true);
        
        const [name, image, cardPrice, color, description] = clone.querySelectorAll("h3, img, p, p, p");

        name.innerHTML = `${product.Name}`;
        image.src = `${product.Image}`;
        image.alt = `${product.Name}`
        cardPrice.innerHTML= `$${product.ListPrice}`;
        color.innerHTML = `${product.Colors[0].ColorName}`;
        description.innerHTML =`${product.DescriptionHtmlSimple}`;

        main.appendChild(clone);
    }


}
