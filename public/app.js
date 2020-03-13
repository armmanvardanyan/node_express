document.querySelectorAll(".price").forEach(node => {
    node.textContent = new Intl.NumberFormat("ru-RU",{
        currency:"USD",
        style:"currency"
    }).format(node.textContent)
})