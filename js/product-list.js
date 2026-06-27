import { products } from "./products.js"
import { renderProducts } from "./render.js";

const productsContainer = document.getElementById("products-list")

renderProducts(products, productsContainer);


// ค้นหาสินค้า
const searchInput = document.getElementById("search-input")
searchInput.addEventListener("input", () => {

    const searchText = searchInput.value.toLowerCase()

    const result = products.filter((product) => {
        return product.name.toLowerCase().includes(searchText)
    })
    renderProducts(result,productsContainer)
})

