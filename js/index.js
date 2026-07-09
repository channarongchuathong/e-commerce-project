import { products } from "./products.js";
import { createProductCard, renderProducts } from "./render.js";

const bestSellerContainer = document.getElementById("bestSellerContainer")
const newArrivalsContainer = document.getElementById("newArrivals")

const newArrivals = [...products]

newArrivals.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt)
})





const bestSeller = [...products]

bestSeller.sort((a, b) => {
    return b.sold - a.sold
})




function renderCarousel(productList, container) {

    container.innerHTML = ""

    productList.forEach((product) => {
        const carouselItem = document.createElement("div")
        carouselItem.className = "w-64 lg:w-72 shrink-0"

        const card = createProductCard(product)

        carouselItem.appendChild(card)
        container.appendChild(carouselItem)
    });
}

renderCarousel(newArrivals, newArrivalsContainer)

renderCarousel(bestSeller, bestSellerContainer)


const carouselNew = document.getElementById("carouselNew")
const prevNew = document.getElementById("prev-New")
const nextNew = document.getElementById("next-New")

prevNew.addEventListener("click", () => {
    carouselNew.scrollBy({
        left: -carouselNew.clientWidth,
        behavior: "smooth"
    })
})

nextNew.addEventListener("click", () => {
    carouselNew.scrollBy({
        left: carouselNew.clientWidth,
        behavior: "smooth"
    })
})

const carouselBest = document.getElementById("carouselBest")
const prevBest = document.getElementById("prev-best")
const nextBest = document.getElementById("next-best")

prevBest.addEventListener("click", () => {
    carouselBest.scrollBy({
        left: -carouselBest.clientWidth,
        behavior: "smooth"
    })
})

nextBest.addEventListener("click", () => {
    carouselBest.scrollBy({
        left: carouselBest.clientWidth,
        behavior: "smooth"
    })
})