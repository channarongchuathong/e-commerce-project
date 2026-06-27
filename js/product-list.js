import { products } from "./products.js"
import { renderProducts } from "./render.js";

const productsContainer = document.getElementById("products-list")

renderProducts(products, productsContainer);

