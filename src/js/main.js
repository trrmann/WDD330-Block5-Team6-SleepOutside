import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';

const productListElement = document.querySelector('#product-list');
const category = 'products';
const productData = new ProductData(category);
const productList = new ProductList(category, productData, productListElement);

productList.init();
