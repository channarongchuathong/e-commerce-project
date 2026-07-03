import { products } from "./products.js";
import { createButtonColors, renderProductDetail } from "./render.js";

// แสดง url ตามสินค้าที่เลือกด้วย id

const params = new URLSearchParams(window.location.search);
const id = params.get("id");


// หาสินค้าตาม id ที่ได้มา
const product = products.find((product) => {
    return product.id == id;
});

renderProductDetail(product)

createButtonColors(product)


let quantity = 1

let quantityDisplay = document.getElementById("quantity-shows")

function renderQuantity() {
    quantityDisplay.innerText = quantity
}


function changeQuantity(action) {

    if (action === "increase") {
        quantity++
    } else if (action === "decrease") {
        if (quantity > 1) {
            quantity--
        }
    }
    renderQuantity()
}


function setupQuantityEvents() {
    const increase = document.getElementById("increase")
    increase.addEventListener("click", () => {
        changeQuantity("increase")
    })
    const decrease = document.getElementById("decrease")
    decrease.addEventListener("click", () => {
        changeQuantity("decrease")
    })
}

renderQuantity()
setupQuantityEvents()





