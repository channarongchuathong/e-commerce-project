import { products } from "./products.js"
import { renderProducts } from "./render.js";
import { setupSearch,setupSearchMobile } from "./seach.js";


const productsContainer = document.getElementById("products-list")

let searchText = ""
let selectedCategory = "All"
let minPrice = 0
let maxPrice = 500
let sortType = "popular"
applyFilters();

function applyFilters() {
    let result = products

    result = result.filter((product) => {
        return product.name.toLowerCase().includes(searchText)
    })

    if (selectedCategory != "All") {
        result = result.filter((product) => {
            return product.category == selectedCategory
        })
    }

    result = result.filter((product) => {
        return product.price >= minPrice && product.price <= maxPrice
    })

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

searchInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        searchText = searchInput.value.toLowerCase()

        applyFilters()
    }
})


const categoryRadio = document.querySelectorAll('input[name="category"]')
const titleProducts = document.getElementById("title-products")

categoryRadio.forEach((radio) => {

    radio.addEventListener("change", () => {
        selectedCategory = radio.value

        if (radio.value == "All") {
            titleProducts.textContent = "Products"

            searchText = ""
            searchInput.value = ""
        } else {
            titleProducts.textContent = radio.value
        }

        applyFilters()
    })
})


const sortSelect = document.getElementById("sort")
sortSelect.addEventListener("change", () => {
    sortType = sortSelect.value

    applyFilters()
})


/// แสดงสินค้าจากการค้นหาหน้าแรก 

function loadSearchFromURL() {
    const params = new URLSearchParams(window.location.search)
    const keyword = params.get("search")

    if (keyword) {
        searchInput.value = keyword;
        searchText = keyword.toLowerCase();
        applyFilters();
    }
}

loadSearchFromURL()


//// slider price 
const priceSlider = document.getElementById("price-slider")

noUiSlider.create(priceSlider, {
    start: [0, 500],
    connect: true,
    range: {
        min: 0,
        max: 500
    }
})


const minPriceText = document.getElementById("min-price")
const maxPriceText = document.getElementById("max-price")

priceSlider.noUiSlider.on("update", (values) => {
    minPriceText.textContent = `$${parseInt(values[0])}`
    maxPriceText.textContent = `$${parseInt(values[1])}`
})


priceSlider.noUiSlider.on("change", (values) => {
    minPrice = parseInt(values[0])
    maxPrice = parseInt(values[1])

    applyFilters()
})




const searchButton = document.getElementById("search-mobile-button")
const searchContainer = document.getElementById("search-mobile-container")
const searchInputMobile = document.getElementById("search-input-mobile")
setupSearch(searchInputMobile)

setupSearchMobile(searchButton,searchContainer,searchInputMobile)