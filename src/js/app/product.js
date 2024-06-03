import { products } from "../core/data.js";
import { cartItemGroup, openDrawer, productGroup, productTemplate } from "../core/selectors.js"
import { createCart, updateCartCount, updateCartTotalCost } from "./cart.js";

export const createProduct = (product)=> {
    const template = productTemplate.content.cloneNode(true);
    template.querySelector(".product-card").setAttribute("product-id", product.id);
    template.querySelector(".product-img").src = product.image;
    template.querySelector(".product-title").innerText = product.title;
    template.querySelector(".product-description").innerText = product.description;
    template.querySelector(".product-rating").innerText = ` ${product.rating.rate} / ${product.rating.count} `;
    template.querySelector(".product-price").innerText = product.price;

    // console.log(Math.round(product.rating.rate));
    template.querySelector(".product-star").innerHTML = renderStar(product.rating.rate);

    // const isExistedInCart = cartItemGroup.querySelector(`[cart-product-id='${product.id}']`);
    // if(isExistedInCart){
    //     template.querySelector(".add-to-cart-btn").setAttribute("disabled", true);
    //     template.querySelector(".add-to-cart-btn").innerText = "Added";
    // }

    return template;
}

export const renderProduct = (products)=> {
    productGroup.innerHTML = null;
    products.forEach((product) => {
        productGroup.append(createProduct(product));
    });
}

export const handleProductGroupBtn = (event)=> {
    if(event.target.classList.contains("add-to-cart-btn")){
        const currentBtn = event.target;
        currentBtn.setAttribute('disabled', 'true');
        currentBtn.innerText = "Added";
        currentBtn.style.opacity = "70%";
        // console.log(event.target.closest(".product-card")); 
        const currentProductCard = event.target.closest(".product-card");
        const currentProductCardID = parseInt(currentProductCard.getAttribute("product-id"));
        // console.log(currentProductCardID);

        const currentProduct = products.find(el => el.id === currentProductCardID);
        // console.log(currentProduct);
        // console.log(typeof(currentProduct));

        const currentProductCardImg = currentProductCard.querySelector(".product-img");
        // console.log(currentProductCardImg);

        const animateImg = new Image();
        animateImg.src = currentProductCardImg.src;
        animateImg.style.position = "fixed";
        animateImg.style.top = currentProductCardImg.getBoundingClientRect().top + "px";
        animateImg.style.left = currentProductCardImg.getBoundingClientRect().left + "px";
        animateImg.style.width = currentProductCardImg.getBoundingClientRect().width + "px";
        animateImg.style.height = currentProductCardImg.getBoundingClientRect().height + "px";
        // console.log(animateImg);
        document.body.append(animateImg);

        // console.log(openDrawer);
        const keyframes = [
        {
            top: currentProductCardImg.getBoundingClientRect().top + "px",
            left: currentProductCardImg.getBoundingClientRect().left + "px",
        },
        {
            top: openDrawer.querySelector("svg").getBoundingClientRect().top + "px",
            left: openDrawer.querySelector("svg").getBoundingClientRect().left + "px",
            width: "0px",
            height: "0px",
            transform: "rotate(2turn)"
        }
        ]
        const duration = 1000;

        const addToCartAnimation = animateImg.animate(keyframes, duration);

        const handleAnimationFinish = ()=> {
            animateImg.remove();
            openDrawer.classList.add("animate__tada");

            openDrawer.addEventListener("animationend", ()=> {
                openDrawer.classList.remove("animate__tada");
            })

            cartItemGroup.append(createCart(currentProduct, 1));
            updateCartCount();
            updateCartTotalCost();

        }

        addToCartAnimation.addEventListener("finish", handleAnimationFinish);
       
    }
}

// creating stars by rate 
export const renderStar = (rate)=> {
    let stars = "";

    for(let i = 1; i<=5; i++){
        stars+=`
        <svg xmlns="http://www.w3.org/2000/svg" fill="true" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="size-5 ${ i<= Math.round(rate)? 'fill-gray-700' : 'fill-gray-100'}">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
        </svg>
        `;
    }

    return stars;

}
