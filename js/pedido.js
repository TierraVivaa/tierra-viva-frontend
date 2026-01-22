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

    
    btnConfirmarPedido.addEventListener("click", () => {
        Swal.fire({
            title: "¿Confirmar compra?",
            text: "¿Deseas finalizar tu pedido?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Sí, pagar",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#28a745",
            cancelButtonColor: "#d33",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    icon: "success",
                    title: "¡Gracias por tu compra! 🛒🌱",
                    text: "Tu pedido fue confirmado exitosamente",
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "#3085d6",
                });

                localStorage.removeItem("carrito");

                setTimeout(() => {
                    window.location.href = "/html/productos.html";
                }, 1500);
            }
        });
    });
});