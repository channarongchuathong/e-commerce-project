const productsContainer = document.getElementById("products-list")


products.forEach((product) => {
    productsContainer.innerHTML += `
    <div class="card w-full hover:cursor-pointer hover:scale-105 transition">
                    <a href="product-detail.html?id=${product.id}">
                        <figure>
                            <img src="${product.colors[0].images[0]}" alt="Shoes" class="rounded-2xl w-full" />
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