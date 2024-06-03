import { handleCartGroupBtn } from "../app/cart.js";
import { handleCategoryBtn } from "../app/category.js";
import { handleProductGroupBtn } from "../app/product.js";
import { cartItemGroup, categoryGroup, productGroup } from "./selectors.js";

const listener = ()=> {
    categoryGroup.addEventListener("click", handleCategoryBtn);
    productGroup.addEventListener("click", handleProductGroupBtn);
    cartItemGroup.addEventListener("click", handleCartGroupBtn);
}

export default listener;