import { products } from "../core/data.js";
import {  categoryGroup, categoryTemplate } from "../core/selectors.js";
import { renderProduct } from "./product.js";

export const createCategory = (categoryName)=> {
    const template = categoryTemplate.content.cloneNode(true);
    template.querySelector('.category-btn').innerText = categoryName;
    return template;
}

export const renderCategory = (categories)=> {
    categories.forEach((category) => {
        categoryGroup.append(createCategory(category));
    })
}

export const handleCategoryBtn = (event)=> {
    // console.log(event.target.innerText);
    if(event.target.classList.contains("category-btn")){
        const currentCategoryBtn = event.target;
        // console.log(currentCategoryBtn.innerText);
        // console.log(document.querySelector(".category-btn.active"));
        // const active =  document.querySelector(".category-btn.active");
        // active?currentCategoryBtn.classList.remove("active"):currentCategoryBtn.classList.add("active");

        document.querySelector(".category-btn.active")?.classList.remove("active");
        currentCategoryBtn.classList.add("active");

        // console.log(event.target.innerText);
        const currentCategory = event.target.innerText;
        renderProduct(products.filter(el => el.category === currentCategory || currentCategory === "All"));
    }
    
}