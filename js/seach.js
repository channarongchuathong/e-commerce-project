export function setupSearch(searchInput) {

    if (!searchInput) return

    searchInput.addEventListener("keydown", (event) => {

        if (event.key === "Enter") {
            window.location.href = `shop.html?search=${encodeURIComponent(searchInput.value)}`
        }
    })

}

export function setupSearchMobile(searchButton, searchContainer, searchInput) {

    if (!searchButton || !searchContainer || !searchInput) return;
    
    searchButton.addEventListener(("click"), () => {
        searchContainer.classList.toggle("hidden")

        if(!searchContainer.classList.contains("hidden")) {
            searchInput.focus()
        }
    })
}