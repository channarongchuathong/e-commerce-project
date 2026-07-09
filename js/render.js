import { products } from "./products.js";


export function renderProducts(productList, container) {

    container.innerHTML = ""

    productList.forEach((product) => {
        const card = createProductCard(product)
        container.appendChild(card)
    });
}

export function createProductCard(product) {
    const card = document.createElement("div")
    card.className = "card rounded-2xl w-full hover:cursor-pointer hover:scale-105 transition overflow-hidden shadow-md"
    const link = document.createElement("a")
    link.href = `product-detail.html?id=${product.id}`

    card.appendChild(link)

    const imgBox = document.createElement("figure")
    const img = document.createElement("img")
    img.className = " w-full"
    img.src = product.colors[0].images[0]
    img.alt = product.name

    link.appendChild(imgBox)
    imgBox.appendChild(img)

    const detailCard = document.createElement("div")
    detailCard.className = "flex flex-col items-start gap-1 py-2 px-3"

    link.appendChild(detailCard)

    const productName = document.createElement("h1")
    productName.className = "card-title"
    productName.textContent = product.name

    detailCard.appendChild(productName)

    const productPrice = document.createElement("p")
    productPrice.className = "font-bold text-sm lg:text-xl"
    productPrice.textContent = `$${product.price}`

    detailCard.appendChild(productPrice)

    return card
}




