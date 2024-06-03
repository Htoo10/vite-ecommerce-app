import Swal from "sweetalert2";
import { cartItemCount, cartItemTemplate, itemBadgeCount, productGroup, totalCost } from "../core/selectors"

export const createCart = (product, quantity)=> {
    const template = cartItemTemplate.content.cloneNode("true");
    template.querySelector(".cart-item").setAttribute('cart-item-id', product.id);
    template.querySelector(".cart-item-img").src = product.image;
    template.querySelector(".cart-title").innerText = product.title;
    template.querySelector(".cart-price").innerText = product.price;
    template.querySelector(".cart-quantity").innerText = quantity;
    template.querySelector(".cart-cost").innerText = product.price * quantity;
    return template;
} 

export const cartCount = ()=> {
    // console.log(event.target);
    // const productCard = event.target.closest(".product-card");
    // console.log(productCard);
    const productCard = document.querySelectorAll(".cart-item");
    // console.log(productCard.length);
    return productCard.length;
}

export const updateCartCount = ()=> {
    const totalCount = cartCount();
    itemBadgeCount.innerText = totalCount;
    cartItemCount.innerText = totalCount;
}

export const calculateCartTotalCost = ()=> {
    const total = document.querySelectorAll(".cart-cost");
    // console.log(total[0].innerText);
    const calculateTotal = [...total].reduce((pv,cv) => pv + parseFloat(cv.innerText), 0);
    const totalResult = calculateTotal.toFixed(2);
    // console.log(calculateTotal);
    return totalResult;
}

export const updateCartTotalCost = ()=> {
    const total = calculateCartTotalCost();
    totalCost.innerText = total;
}

export const handleCartGroupBtn = (event)=> {
    // console.log(event.target);
    if(event.target.classList.contains("cart-del-btn")){
        // console.log(event.target);
        const currentItem = event.target.closest(".cart-item");
        // console.log(currentItem);
       const currentItemID = currentItem.getAttribute('cart-item-id');
       const currentProduct = productGroup.querySelector(`[product-id = '${currentItemID}' ]`);
    //    console.log(currentProduct);
        const currentAddToCardBtn = currentProduct.querySelector(".add-to-cart-btn");
        // console.log(currentAddToCardBtn);

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                currentItem.remove();
                updateCartCount();
                updateCartTotalCost();
                currentAddToCardBtn.removeAttribute('disabled');
                currentAddToCardBtn.innerText = "Add to cart";
            }
          });
    }

    if(event.target.classList.contains("cart-q-add")){
        // console.log(event.target);
        const currentItem = event.target.closest(".cart-item");
        const currentItemCost = currentItem.querySelector(".cart-cost");
        const currentItemPrice = currentItem.querySelector(".cart-price");
        const currentItemQuantity = currentItem.querySelector(".cart-quantity");

        currentItemQuantity.innerText = parseInt(currentItemQuantity.innerText) + 1;
        currentItemCost.innerText = (currentItemPrice.innerText * currentItemQuantity.innerText).toFixed(2);
        updateCartTotalCost();
    }

    if(event.target.classList.contains("cart-q-sub")){
        // console.log(event.target);
        const currentItem = event.target.closest(".cart-item");
        const currentItemCost = currentItem.querySelector(".cart-cost");
        const currentItemPrice = currentItem.querySelector(".cart-price");
        const currentItemQuantity = currentItem.querySelector(".cart-quantity");

        if(currentItemQuantity.innerText > 1){
            currentItemQuantity.innerText = parseInt(currentItemQuantity.innerText) - 1;
            currentItemCost.innerText = (currentItemPrice.innerText * currentItemQuantity.innerText).toFixed(2);
            updateCartTotalCost();
        }
    }
}