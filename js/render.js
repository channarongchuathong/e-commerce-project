
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
                const thumbnail = createThumbnail(image,productImg)

                productImgs.appendChild(thumbnail)
            })
        })



    })
}


