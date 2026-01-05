document.addEventListener("DOMContentLoaded", () => {
    const listaPedidos = document.getElementById("listaPedidos");
    const subtotalSpan = document.getElementById("subtotal");
    const totalSpan = document.getElementById("total");

    //  Boton regresar a productos
    btnRegresar.addEventListener("click", () => {
        window.location.href = "/html/productos.html";
    });

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length === 0) {
        listaPedidos.innerHTML = `
            <div style="background:#fff; padding:20px; border-radius:10px; text-align:center;">
                <h3>Tu carrito está vacío</h3>
                <a href="/html/productos.html" style="color:#00b412; font-weight:bold;">Seguir comprando</a>
            </div>
        `;
        subtotalSpan.textContent = "$0";
        totalSpan.textContent = "$0";
        return;
    }

    let subtotal = 0;

    carrito.forEach(producto => {
        const subtotalProd = producto.precio * producto.cantidad;
        subtotal += subtotalProd;

        listaPedidos.innerHTML += `
            <div class="producto">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <div>
                    <h3>${producto.nombre}</h3>
                    <p>Unidad de venta: ${producto.unidad || "1 und"}</p>
                    <p>Categoria: ${producto.categoria || "General"}</p>
                    <p class="precio">$${producto.precio.toLocaleString()}</p>
                    <p>Cantidad: ${producto.cantidad}</p>
                </div>
            </div>
        `;
    });

    subtotalSpan.textContent = `$${subtotal.toLocaleString()}`;
    totalSpan.textContent = `$${subtotal.toLocaleString()}`; 

    
    document.getElementById("btnConfirmarPedido").addEventListener("click", () => {
        alert("¡Gracias por tu compra! 🛒🌱");
        localStorage.removeItem("carrito");
        window.location.href = "/html/productos.html";
    });
});
