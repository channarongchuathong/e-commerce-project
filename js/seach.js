export function setupSearch() {
    const searchInput = document.getElementById("search-input")
    if (!searchInput) return
    searchInput.addEventListener("keydown", (event) => {

        if (event.key === "Enter") {
            window.location.href = `shop.html?search=${encodeURIComponent(searchInput.value)}`
        }
    })

}