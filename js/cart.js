import { products } from "./products.js"
import { setupSearch,setupSearchMobile } from "./seach.js"

let cart = JSON.parse(localStorage.getItem("cart")) || []

const checkoutBtn = document.getElementById("checkoutBtn")
const placeOrderBtn = document.getElementById("placeOrder")
const checkoutContainer = document.getElementById("checkoutContainer")

const cartContainer = document.getElementById("cartContainer")
export function renderCart(cart, cartContainer) {


    cartContainer.innerHTML = ""


    if (cart.length === 0) {

        cartContainer.innerHTML = `
        <div class="h-50 flex justify-center items-center p-4">
            <div>
            Your cart is empty Looks like you haven't added any items yet.
            </div>
        </div>`

        checkoutBtn.disabled = true
        return
    }


    cart.forEach((cartItem) => {
        const product = products.find((product) => {
            return product.id === cartItem.id
        })


        const selectedColor = product.colors.find((color) => {
            return color.name === cartItem.color
        })

        const cartCard = document.createElement("div")
        cartCard.className = "flex py-[20px]"
        cartCard.innerHTML = ` <div class="rounded-lg overflow-hidden">
                                <img src="${selectedColor.images[0]}" alt="" class="w-35 h-40 object-cover">
                            </div>
                            <div class="flex justify-between flex-1 py-[10px] px-2 lg:px-[20px]">
                                <div class="flex flex-col justify-between">
                                    <div>
                                        <h1 class="text-xl font-bold">${product.name}</h1>
                                        <p>Size : ${cartItem.size}</p>
                                        <p>Color : ${cartItem.color}</p>
                                    </div>
                                    <div>
                                        <h1 class="text-xl font-bold">$${product.price}</h1>
                                    </div>
                                </div>
                                <div class="flex flex-col justify-between">
                                    <div class="flex justify-end">
                                        <button class="hover:cursor-pointer" data-action="delete">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke-width="1.5" stroke="currentColor"
                                                class="size-5 text-red-500 hover:text-red-700 transition">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div
                                        class="flex justify-center lg:justify-between w-15 lg:w-25 p-1 px-4 gap-2 lg:gap-3 items-center rounded-full bg-base-200 font-semibold">
                                        <button  data-action="decrease" class="hover:cursor-pointer font-bold text-md lg:text-xl">-</button>
                                        <div>${cartItem.quantity}</div>
                                        <button  data-action="increase" class="hover:cursor-pointer font-bold text-md lg:text-xl">+</button>
                                    </div>
                                </div>
                            </div>
                        </div>`;

        cartContainer.appendChild(cartCard)

        const increaseButton = cartCard.querySelector('[data-action="increase"]')
        const decreaseButton = cartCard.querySelector('[data-action="decrease"]')
        const deleteButton = cartCard.querySelector('[data-action="delete"]')

        increaseButton.addEventListener("click", () => {
            changeCartQuantity(cartItem, "increase")
        })
        decreaseButton.addEventListener("click", () => {
            changeCartQuantity(cartItem, "decrease")
        })
        deleteButton.addEventListener("click", () => {
            changeCartQuantity(cartItem, "delete")
        })

    })
}

function changeCartQuantity(cartItem, action) {

    if (action === "increase") {
        cartItem.quantity++
    } else if (action === "decrease") {
        if (cartItem.quantity > 1) {
            cartItem.quantity--
        }
    } else if (action === "delete") {
        cart = cart.filter((item) => {
            return !(
                item.id === cartItem.id &&
                item.color === cartItem.color &&
                item.size === cartItem.size
            )
        })
    }

    localStorage.setItem("cart", JSON.stringify(cart)
    )
    renderCart(cart, cartContainer)
    calculateCart()

}


renderCart(cart, cartContainer)
const totalContainer = document.getElementById("total")

const order = document.getElementById("cart-order")

function calculateCart() {
    order.innerHTML = ""
    let total = 0

    cart.forEach((cartItem) => {
        const product = products.find((product) => {
            return product.id === cartItem.id
        })

        const itemTotal = product.price * cartItem.quantity

        order.innerHTML += ` <div class="flex justify-between mb-1">
                                    <div class="font-bold">${product.name} Size ${cartItem.size}
                                        <div class="font-normal">
                                            $${product.price} × ${cartItem.quantity}
                                        </div>
                                    </div>
                                    <p>$${itemTotal}</p>
                                </div>`

        total += itemTotal


    })
    const totalContainer = document.getElementById("total")
    totalContainer.textContent = `$${total}`

}

calculateCart()

const promoCode = document.getElementById("promo-apply")
promoCode.addEventListener("click", () => {
    alert("คุณไม่มีคูปองส่วนลด")
})



checkoutBtn.addEventListener(("click"), () => {
    cartContainer.classList.add("hidden")
    checkoutContainer.classList.remove("hidden")

    checkoutBtn.classList.add("hidden")
    placeOrderBtn.classList.remove("hidden")
})

placeOrderBtn.addEventListener(("click"), () => {
    alert("Order Success!")

    localStorage.removeItem("cart")

    window.location.href = "shop.html"
})


setupSearch()

const searchInput = document.getElementById("search-input")
setupSearch(searchInput)

const searchButton = document.getElementById("search-mobile-button")
const searchContainer = document.getElementById("search-mobile-container")
const searchInputMobile = document.getElementById("search-input-mobile")
setupSearch(searchInputMobile)

setupSearchMobile(searchButton,searchContainer,searchInputMobile)