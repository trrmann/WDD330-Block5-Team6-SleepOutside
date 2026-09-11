import ProductData from './productData.mjs';
import ProductList from './ProductList.mjs';

const productListElement = document.getElementById('product-card-list');
const dataSource = new ProductData('tents');

const productList = new ProductList('Tents', dataSource, productListElement);
productList.init();
