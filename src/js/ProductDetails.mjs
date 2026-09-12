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
        
        this.renderProductDetails(this.product);
    }


    renderProductDetails(product){


        const sectionTemplate = document.getElementById("productDetailTemplate");
        const main = document.getElementById("main");

        const clone = sectionTemplate.content.cloneNode(true);
        
        const [name, image, retail, sale, cardPrice, color, description, addToCartButton ] = clone.querySelectorAll("h3, img, p, p, p, p, p, p, button");

        name.innerHTML = `${product.Name}`;
        image.src = `${product.Image}`;
        image.alt = `${product.Name}`;
        retail.innerHTML = `Retail: $${product.SuggestedRetailPrice}`;
        sale.innerHTML = `Discount: ${((product.SuggestedRetailPrice - product.FinalPrice) / product.SuggestedRetailPrice * 100).toFixed(0)}% Save: $${(product.SuggestedRetailPrice - product.FinalPrice).toFixed(2)}! `;
        cardPrice.innerHTML= `Final: $${product.ListPrice}`;

        color.innerHTML = `${product.Colors[0].ColorName}`;
        description.innerHTML =`${product.DescriptionHtmlSimple}`;

        addToCartButton.dataset.id = `${product.Id}`;

        main.appendChild(clone);
    }


}
