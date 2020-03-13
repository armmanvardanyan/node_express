document.querySelectorAll(".price").forEach(node => {
    node.textContent = new Intl.NumberFormat("ru-RU",{
        currency:"AMD",
        style:"currency"
    }).format(node.textContent)
})