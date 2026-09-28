import { getParam } from "./utils.mjs";
import ProductDetails from "./ProductDetails.mjs";
import ExternalServices from "./ExternalServices.mjs";

const main = document.querySelector("main");
const breadcrumbDiv = document.createElement("div");
let breadcrumbInnerHTML = `<a href="/index.html">Home</a>`;

export default async function addBreadcrumbs(){

    

    //get pathname without the "/" at the begining
    let pathname = window.location.pathname.slice(1);
    
    const crumbs = pathname.split("/");
    //if we split by / then the first object in crumbs will be an empty string
    switch(crumbs[0]){

        case "product_listing":
        addProductListBreadcrumb();
        break;

        case "product_pages":
            await addProductPagesBreadcrumb();
        break;

        case "cart":
            addCartBreadcrumb();
        break;

        case "checkout":
            if (crumbs[1] == "success.html"){
                addSuccessBreadcrumb();
            }
            else {
                addCheckoutBreadcrumb();
            }
        break;

        default:
            break;
        
    
    }

}

function addProductListBreadcrumb(){
    
    let category = getParam('category');
    //capitalize the first letter
    category = category[0].toUpperCase() + category.slice(1);

    let products = document.getElementsByClassName("product-card");
    
    
    breadcrumbInnerHTML = breadcrumbInnerHTML + " -- " + `${category}->(${products.length} items)`;
    console.log(breadcrumbInnerHTML);
    breadcrumbDiv.innerHTML = breadcrumbInnerHTML;

    main.prepend(breadcrumbDiv);
}


async function addProductPagesBreadcrumb(){

    const productId = getParam('product');
    const dataSource = new ExternalServices();
    const product = new ProductDetails(productId, dataSource);

    
    let category = await product.getProductCategory();

    //capitalize the first letter
    category = category[0].toUpperCase() + category.slice(1);

    breadcrumbDiv.innerHTML = breadcrumbInnerHTML+ " -- " + `${category}`;

    main.prepend(breadcrumbDiv);
}

function addCartBreadcrumb(){

    breadcrumbInnerHTML = breadcrumbInnerHTML + " -- " + `Cart`;
    breadcrumbDiv.innerHTML = breadcrumbInnerHTML;

    main.prepend(breadcrumbDiv);
}

function addCheckoutBreadcrumb(){

    breadcrumbInnerHTML = breadcrumbInnerHTML + " -- " + `Checkout`;
    breadcrumbDiv.innerHTML = breadcrumbInnerHTML;

    main.prepend(breadcrumbDiv);
}

function addSuccessBreadcrumb(){
    breadcrumbInnerHTML = breadcrumbInnerHTML + " -- " + `<a href="/checkout/index.html">Checkout</a>` + ' -- ' + 'Success';
    breadcrumbDiv.innerHTML = breadcrumbInnerHTML;

    main.prepend(breadcrumbDiv);
}