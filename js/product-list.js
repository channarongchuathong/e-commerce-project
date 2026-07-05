import { products } from "./products.js"
import { renderProducts } from "./render.js";

const productsContainer = document.getElementById("products-list")

let searchText = "";
let selectedCategory = "all";
let sortType = "popular";
applyFilters();

function applyFilters() {
    let result = products

    result = result.filter((product) => {
        return product.name.toLowerCase().includes(searchText)
    })

    if (selectedCategory != "all") {
        result = result.filter((product) => {
            return product.category == selectedCategory
        })
    }

    if (sortType == "popular") {
        result.sort((a, b) => {
            return b.sold - a.sold
        })
    } else if (sortType == "newest") {
        result.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })
    } else if (sortType == "price-low") {
        result.sort((a, b) => {
            return a.price - b.price
        })
    } else if (sortType == "price-high") {
        result.sort((a, b) => {
            return b.price - a.price
        })
    }

    renderProducts(result, productsContainer)
}

const searchInput = document.getElementById("search-input")

searchInput.addEventListener("input", () => {

    searchText = searchInput.value.toLowerCase()

    applyFilters()
})


const categoryRadio = document.querySelectorAll('input[name="category"]')

categoryRadio.forEach((radio) => {

    radio.addEventListener("change", () => {
        selectedCategory = radio.value

        applyFilters()
    })
})


const sortSelect = document.getElementById("sort")
sortSelect.addEventListener("change", () => {
    sortType = sortSelect.value

    applyFilters()
})

