import { products } from "./products.js";

// แสดง url ตามสินค้าที่เลือกด้วย id

const params = new URLSearchParams(window.location.search);
const id = params.get("id");


// หาสินค้าตาม id ที่ได้มา
const product = products.find((product) => {
    return product.id == id;
});


// รับข้อมูลสินค้าเพื่อมาแสดง
const productName = document.getElementById("product-name");
productName.textContent = product.name;

const productPrice = document.getElementById("product-price");
productPrice.textContent = `$${product.price}`;

const productoriginalPrice = document.getElementById("product-original-price");
productoriginalPrice.textContent = `$${product.originalprice}`;

const productImg = document.getElementById("product-img");
productImg.src = product.colors[0].images[0];

const productDescription = document.getElementById("product-description");
productDescription.textContent = product.description;


const productImgs = document.getElementById("product-imgs")

product.colors[0].images.forEach((image) => {
    productImgs.innerHTML += `
    <div class="aspect-square rounded-2xl overflow-hidden hover:cursor-pointer hover:ring-1">
        <img src="${image}" alt="รูปภาพ" class="h-full w-full object-cover">
    </div>
  `;
});

const thumbnails = productImgs.querySelectorAll("img");

thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click",() => {
        productImg.src = thumbnail.src
    })
})



const discount =
    ((product.originalprice - product.price) / product.originalprice) * 100;

const productDiscount = document.getElementById("product-discount")
productDiscount.textContent = `${Math.round(discount)}%`

