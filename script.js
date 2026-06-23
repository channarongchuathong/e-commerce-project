const products = [
    {
        id: 1,
        name: "Classic T-Shirt",
        price: 100,
        colors: [
            {
                color: "Black",
                image: "/img/product-casual/t-shirt-black-1.png"
            },
            {
                color: "White",
                image: "/img/product-casual/t-shirt-white-1.png"
            }
        ],
        category: "casual",
    },
    {
        id: 2,
        name: "Classic Hoodie",
        price: 250,
        colors: [
            {
                color: "Black",
                image: "/img/product-casual/hoodie-black-1.png"
            },
            {
                color: "White",
                image: "/img/product-casual/hoodie-white-1.png"
            }
        ],
        category: "casual",
    },
    {
        id: 3,
        name: "Essential Shirt",
        price: 160,
        colors: [
            {
                color: "Black",
                image: "/img/product-casual/essential-shirt-black-1.png"
            },
            {
                color: "White",
                image: "/img/product-casual/essential-shirt-white-1.png"
            }
        ],
        category: "casual",
    }
    
]

const productsContainer = document.getElementById("products")


products.forEach((product) => {
    productsContainer.innerHTML += `
    <div class="card w-72 hover:cursor-pointer hover:scale-105 transition">
                    <a href="products.html">
                        <figure>
                            <img src="${product.colors[0].image}" alt="Shoes" class="rounded-2xl w-full" />
                        </figure>
                        <div class="flex flex-col items-start gap-1 py-2">
                            <h2 class="card-title">${product.name}</h2>
                            <div class="flex">
                                <div class="rating rating-sm">
                                    <div class="mask mask-star bg-yellow-400" aria-label="1 star"></div>
                                    <div class="mask mask-star bg-yellow-400" aria-label="2 star"></div>
                                    <div class="mask mask-star bg-yellow-400" aria-label="3 star"></div>
                                    <div class="mask mask-star bg-yellow-400" aria-label="4 star" aria-current="true">
                                    </div>
                                    <div class="mask mask-star bg-yellow-400" aria-label="5 star"></div>
                                </div>

                                <div class="text-black text-sm pl-1">
                                    4/5
                                </div>
                            </div>
                            <p class="font-bold text-xl">$${product.price}</p>
                        </div>
                    </a>
                </div>
  `;
});