import { products } from "./products.js";

// แสดง url ตามสินค้าที่เลือกด้วย id

const params = new URLSearchParams(window.location.search);
const id = params.get("id");


// หาสินค้าตาม id ที่ได้มา
const product = products.find((product) => {
    return product.id == id;
});

let selectedColor = ""
let selectedSize = ""
let quantity = 1

function renderProductDetail(product) {
    const productName = document.getElementById("product-name");
    productName.textContent = product.name;

    const productPrice = document.getElementById("product-price");
    productPrice.textContent = `$${product.price}`;

    const productoriginalPrice = document.getElementById("product-original-price");
    productoriginalPrice.textContent = `$${product.originalprice}`;

    const productImg = document.getElementById("product-img");
    productImg.src = product.colors[0].images[0];
    productImg.className = "hover:cursor-pointer"

    const productImgs = document.getElementById("product-imgs")

    const productDescription = document.getElementById("product-description");
    productDescription.textContent = product.description;

    const discount =
        ((product.originalprice - product.price) / product.originalprice) * 100;

    const productDiscount = document.getElementById("product-discount")
    productDiscount.textContent = `${Math.round(discount)}%`


    product.colors[0].images.forEach((image) => {

        const thumbnail = createThumbnail(image, productImg)

        productImgs.appendChild(thumbnail)

    });


}

function createThumbnail(image, productImg) {
    const thumbnail = document.createElement("div")
    thumbnail.className = "aspect-square rounded-2xl overflow-hidden hover:cursor-pointer hover:ring-1"

    const img = document.createElement("img")
    img.src = image
    img.classList = "h-full w-full object-cover"
    thumbnail.appendChild(img)

    thumbnail.addEventListener("click", () => {
        productImg.src = image
    })

    return thumbnail
}


const colorContainer = document.getElementById("product-colors")
function createButtonColors(product) {
    product.colors.forEach((color, index) => {

        const label = document.createElement("label")
        label.style.backgroundColor = color.value;
        label.className = "btn btn-xs btn-circle border-1 border-zinc-300 has-checked:ring-1 has-checked:ring-offset-2"

        const input = document.createElement("input")
        input.type = "radio"
        input.name = "color"
        input.className = "hidden"
        input.value = color.name

        label.appendChild(input)

        colorContainer.appendChild(label)
        if (index == 0) {
            input.checked = true;
            selectedColor = color.name;
        }

        const productImg = document.getElementById("product-img")
        const productImgs = document.getElementById("product-imgs")

        label.addEventListener("change", () => {

            productImgs.innerHTML = ""

            selectedColor = input.value

            const selectedColorData = product.colors.find((color) => {
                return selectedColor == color.name
            })

            productImg.src = selectedColorData.images[0];

            selectedColorData.images.forEach((image) => {
                const thumbnail = createThumbnail(image, productImg)

                productImgs.appendChild(thumbnail)
            })
        })



    })
}


renderProductDetail(product)
createButtonColors(product)

const sizeInputs = document.querySelectorAll('input[name = "size"]')
sizeInputs.forEach((input) => {
    input.addEventListener("change", () => {
        selectedSize = input.value
    })
})


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

let cart = JSON.parse(localStorage.getItem("cart")) || []

function addToCart(product, selectedColor, selectedSize, quantity) {
    
    const existingItem = cart.find((item) => {
        return item.id === product.id && item.color === selectedColor && item.size === selectedSize
    })

    if (existingItem) {
        existingItem.quantity += quantity
    } else {
        cart.push(
            {
                id: product.id,
                color: selectedColor,
                size: selectedSize,
                quantity: quantity
            }
        )
    }
    localStorage.setItem("cart",JSON.stringify(cart))
    
}

const addToCartButton = document.getElementById("addToCart")
addToCartButton.addEventListener("click", () => {
    addToCart(product, selectedColor, selectedSize, quantity)
})








