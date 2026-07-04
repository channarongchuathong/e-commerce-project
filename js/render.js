import { products } from "./products";

export function renderProducts(productList, container) {

    container.innerHTML = ""

    productList.forEach((product) => {
        const card = createProductCard(product)
        container.appendChild(card)
    });
}

function createProductCard(product) {
    const card = document.createElement("div")
    card.className = "card w-full hover:cursor-pointer hover:scale-105 transition"
    const link = document.createElement("a")
    link.href = `product-detail.html?id=${product.id}`

    card.appendChild(link)

    const imgBox = document.createElement("figure")
    const img = document.createElement("img")
    img.className = "rounded-2xl w-full"
    img.src = product.colors[0].images[0]
    img.alt = product.name

    link.appendChild(imgBox)
    imgBox.appendChild(img)

    const detailCard = document.createElement("div")
    detailCard.className = "flex flex-col items-start gap-1 py-2"

    link.appendChild(detailCard)

    const productName = document.createElement("h1")
    productName.className = "card-title"
    productName.textContent = product.name

    detailCard.appendChild(productName)

    const productPrice = document.createElement("p")
    productPrice.className = "font-bold text-xl"
    productPrice.textContent = `$${product.price}`

    detailCard.appendChild(productPrice)

    return card
}


export function renderProductDetail(product) {
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
export function createButtonColors(product) {
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
        }

        const productImg = document.getElementById("product-img")
        const productImgs = document.getElementById("product-imgs")

        label.addEventListener("change", () => {

            productImgs.innerHTML = ""

            const selectedColor = input.value

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


function renderCart(container) {

    container.innerHTML = ""

    Cart.forEach((cartItem) => {
        const product = products.find((product) => {
            return product.id === cartItem.id
        })
        const selectedColor = product.colors.find((color) => {
            return color.name === cartItem.color
        })

        const cartCard = document.createElement("div")
        cartCard.className = "flex p-[20px]"
        cartCard.innerHTML = ` <div>
                                <img src="${selectedColor.images[0]}" alt="" class="w-30 h-40 object-cover">
                            </div>
                            <div class="flex justify-between flex-1 p-[20px]">
                                <div class="flex flex-col justify-between">
                                    <div>
                                        <h1 class="text-xl font-bold">${product.name}</h1>
                                        <p>Size : ${cartItem.size}</p>
                                        <p>Color : ${cartItem.color}</p>
                                    </div>
                                    <div>
                                        <h1 class="text-xl font-bold">$ ${product.price}</h1>
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
                                        class="flex justify-between w-20 p-1 px-2 gap-3 items-center rounded-full bg-base-200 font-bold">
                                        <button  data-action="decrease">-</button>
                                        <div>${cartItem.quantity}</div>
                                        <button  data-action="increase">+</button>
                                    </div>
                                </div>
                            </div>
                        </div>`;

        container.appendChild(cartCard)

        const increaseButton = cartCard.querySelector('[data-action="increase"]')
        increaseButton.addEventListener("click", () => {
            changeCartQuantity(cartItem, "increase")
        })
        const decreaseButton = cartCard.querySelector('[data-action="decrease"]')
        const deleteButton = cartCard.querySelector('[data-action="delete"]')
    })
}

function changeCartQuantity(cartItem, action) {

    if (action === "increase") {
        cartItem.quantity++
    } else if (action === "decrease") {
        cartItem.quantity--
    } else if (action === "delete") {
        Cart.filter((item) => {
           return !(
            item.id === cartItem.id &&
            item.color === cartItem.color &&
            item.size === cartItem.size
           )
        })
    }

}

