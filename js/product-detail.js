import { products } from "./products.js";
import { createButtonColors, renderProductDetail } from "./render.js";

// แสดง url ตามสินค้าที่เลือกด้วย id

const params = new URLSearchParams(window.location.search);
const id = params.get("id");


// หาสินค้าตาม id ที่ได้มา
const product = products.find((product) => {
    return product.id == id;
});

renderProductDetail(product)

createButtonColors(product)







