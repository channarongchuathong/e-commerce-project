
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