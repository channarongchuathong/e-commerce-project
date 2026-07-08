import { products } from "./products.js";
import { renderProducts } from "./render.js";

const bestSellerContainer = document.getElementById("bestSellerContainer")
const newArrivalsContainer = document.getElementById("newArrivals")

const newArrivals = [...products]

newArrivals.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt)
})

const top4New = newArrivals.slice(0, 4)

renderProducts(top4New, newArrivalsContainer)

const bestSeller = [...products]

bestSeller.sort((a, b) => {
    return b.sold - a.sold
})

const top4Seller = bestSeller.slice(0, 4)

renderProducts(top4Seller, bestSellerContainer)


