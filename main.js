import './style.css'
import 'flowbite';

import Shop from "./src/js/Shop.js";
// import { createProduct } from "./js/app/product.js";
// import { products } from "./js/core/data.js";
// import { createCategory } from "./js/app/category.js";

const shop = new Shop();
shop.init();

// console.log(createCategory("Hello")); 
// console.log(createProduct(products[2]));