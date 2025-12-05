let carrito = [];

// Elementos del DOM del carrito
const contenedorItems = document.getElementById("carritoItems");
const contadorCarrito = document.getElementById("contadorCarrito");
const totalCarrito = document.getElementById("carritoTotal");

// Escuchar clicks globales
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-agregar-carrito")) {

        const id = e.target.dataset.id;
        const nombre = e.target.dataset.nombre;
        const precio = parseInt(e.target.dataset.precio);
        const imagen = e.target.dataset.imagen;

        agregarAlCarrito(id, nombre, precio, imagen);
    }
});

function agregarAlCarrito(id, nombre, precio, imagen) {
    let producto = carrito.find((p) => p.id === id);

    if (producto) {
        producto.cantidad++;
    } else {
        carrito.push({
            id,
            nombre,
            precio,
            imagen,
            cantidad: 1
        });
    }

    renderCarrito();
}

function renderCarrito() {
    contenedorItems.innerHTML = "";

    let total = 0;
    let cantidadTotal = 0;

    carrito.forEach((item, index) => {
        total += item.precio * item.cantidad;
        cantidadTotal += item.cantidad;

        contenedorItems.innerHTML += `
            <div class="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">

                <img src="${item.imagen}" width="50">

                <div class="ms-2">
                    <p class="m-0 fw-bold">${item.nombre}</p>
                    <small>$${item.precio.toLocaleString()}</small>
                </div>

                <div class="d-flex align-items-center gap-2">
                    <button class="btn btn-sm btn-danger" onclick="actualizarCantidad(${index}, -1)">-</button>
                    <span>${item.cantidad}</span>
                    <button class="btn btn-sm btn-success" onclick="actualizarCantidad(${index}, 1)">+</button>
                </div>
            </div>
        `;
    });

    contadorCarrito.textContent = cantidadTotal;
    totalCarrito.textContent = total.toLocaleString();
}

function actualizarCantidad(index, cambio) {
    carrito[index].cantidad += cambio;

    if (carrito[index].cantidad <= 0) {
        carrito.splice(index, 1);
    }

    renderCarrito();
}
