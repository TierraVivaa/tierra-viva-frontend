/************************************************
 * 1️⃣ DATA MOCK (PRODUCTOS MÁS VENDIDOS)
 ************************************************/
const productosMasVendidos = [
  {
    id: 1001,
    nombre: "Banano",
    categoria: "Fruta",
    precio: 3200,
    precioOriginal: 4000,
    descuento: 20,
    unidad: "kg",
    cantidadDisponible: 150,
    imagen: "../assets/images/productos/banano.jpg",
  },
  {
    id: 1002,
    nombre: "Papa Pastusa",
    categoria: "Verdura",
    precio: 1800,
    precioOriginal: 2500,
    descuento: 28,
    unidad: "kg",
    cantidadDisponible: 200,
    imagen: "../assets/images/productos/papa.jpg",
  },
  {
    id: 1003,
    nombre: "Fríjol Bola Roja",
    categoria: "Legumbre",
    precio: 4800,
    precioOriginal: 6000,
    descuento: 20,
    unidad: "libra",
    cantidadDisponible: 80,
    imagen: "../assets/images/productos/frijol_bola_roja.jpg",
  },
];

/************************************************
 * 2️⃣ VARIABLES GLOBALES
 ************************************************/
let productoActual = null;
let modalCantidad = null;
  let modalCarrito = null;


/************************************************
 * 3️⃣ UTILIDADES
 ************************************************/
function formatoCOP(valor) {
  const numero = Number(valor) || 0;
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: numero % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(numero);
}

/************************************************
 * 4️⃣ API
 ************************************************/

async function getCategoriasDeLaBd() {
  try {
    const response = await fetch("http://localhost:8080/api/categorias");
    if (!response.ok) throw new Error("Error al cargar categorías");

    const data = await response.json();
    console.log("Categorías recibidas:", data); // 👈 DEBUG

    return data;
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se han podido cargar las categorías",
    });
    return null;
  }
}

/************************************************
 * 5️⃣ RENDER PRODUCTOS
 ************************************************/
function renderizarProductosMasVendidos() {
  const contenedor = document.getElementById("productos-mas-vendidos");
  if (!contenedor) return;

  contenedor.innerHTML = "";

  productosMasVendidos.forEach((p) => {
    contenedor.innerHTML += `
      <div class="col-md-4">
        <div class="card product-card-agro shadow-sm mt-3">
          <img src="${p.imagen}" class="product-img-agro" alt="${p.nombre}">
          <div class="card-body">
            <h5 class="price-agro">${formatoCOP(p.precio)}</h5>
            <p class="old-price">
              Precio por <strong>${p.unidad}</strong>
              ${formatoCOP(p.precioOriginal)}
              <span class="discount-agro">-${p.descuento}%</span>
            </p>
            <h5 class="card-title mb-3">${p.nombre}</h5>

            <div class="d-flex justify-content-center">
              <button class="btn btn-success btn-abrir-modal"
                data-id="${p.id}"
                data-nombre="${p.nombre}"
                data-precio="${p.precio}"
                data-unidad="${p.unidad}"
                data-imagen="${p.imagen}"
                data-stock="${p.cantidadDisponible}">
                <i class="bi bi-cart-plus me-1"></i>Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  });
}

async function renderizarProductosPorCategoria() {
  const contenedor = document.getElementById("contenedor-secciones");
  if (!contenedor) return;

  contenedor.innerHTML = "";

  const categorias = await getCategoriasDeLaBd();
  if (!categorias) return;

  categorias.forEach((categoria) => {
    // Si no hay productos, no renderizar
    if (!categoria.productos || categoria.productos.length === 0) return;

    // Crear sección
    const seccion = document.createElement("div");
    seccion.classList.add("mb-5");

    seccion.innerHTML = `
      <h3 class="mt-4 mb-3">${categoria.nombre}</h3>
      <div class="row" id="cat-${categoria.idCategoria}"></div>
    `;

    contenedor.appendChild(seccion);

    const row = seccion.querySelector(`#cat-${categoria.idCategoria}`);

    // Renderizar productos
    categoria.productos.forEach((p) => {
      row.innerHTML += `
        <div class="col-md-4">
          <div class="card product-card-agro shadow-sm mt-3">
            <img src="${p.imagen}" class="product-img-agro">
            <div class="card-body">
              <h5 class="price-agro">${formatoCOP(p.precioUnitario)}</h5>
              <h5 class="card-title">${p.nombre}</h5>
              <p>${p.descripcion || ""}</p>

              <div class="d-flex justify-content-center">
                <button 
                  class="btn btn-success btn-abrir-modal"
        data-id="${p.idProducto}"
        data-nombre="${p.nombre}"
        data-precio="${p.precioUnitario}"
        data-unidad="${p.unidadDePeso}"
        data-imagen="${p.imagen}"
        data-stock="${p.stock}"
                >
                  <i class="bi bi-cart-plus me-1"></i>Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    });
  });
}

/************************************************
 * 6️⃣ MODAL PRODUCTO
 ************************************************/
function abrirModalProducto(producto) {
  productoActual = producto;

  document.getElementById("modalProductoImagen").src = producto.imagen;
  document.getElementById("modalProductoNombre").textContent = producto.nombre;
  document.getElementById("modalProductoPrecio").textContent = formatoCOP(
    producto.precio,
  );
  document.getElementById("modalProductoUnidad").textContent = producto.unidad;

  const cantidad = document.getElementById("cantidadModal");
  cantidad.value = 1;
  cantidad.max = producto.stock;

  actualizarTotal();
  modalCantidad.show();
}

function actualizarTotal() {
  if (!productoActual) return;

  const inputCantidad = document.getElementById("cantidadModal");
  const totalElement = document.getElementById("modalTotal");
  const stockActual = productoActual.stock || 0;

  const cantidad = parseInt(inputCantidad.value) || 1;
  const total = productoActual.precio * cantidad;

  totalElement.textContent = formatoCOP(total);

  // ===== MOSTRAR STOCK EN EL MODAL =====
  let stockInfo = document.getElementById("stockInfo");

  if (!stockInfo) {
    stockInfo = document.createElement("div");
    stockInfo.id = "stockInfo";
    stockInfo.className = "alert alert-info py-2 mb-3";

    const modalBody = document.querySelector("#modalCantidad .modal-body");
    modalBody.insertBefore(stockInfo, modalBody.firstChild);
  }

  stockInfo.innerHTML = `
    <small>
      <i class="bi bi-box-seam me-1"></i>
      Stock disponible:
      <strong>${stockActual}</strong> unidades
      ${
        cantidad > stockActual
          ? '<span class="text-danger ms-1">(Stock insuficiente)</span>'
          : ""
      }
    </small>
  `;
  const btnConfirmar = document.getElementById("btnConfirmarCompra");

  if (btnConfirmar) {
    if (cantidad > stockActual) {
      btnConfirmar.disabled = true;
      btnConfirmar.classList.replace("btn-success", "btn-secondary");
      btnConfirmar.innerHTML =
        '<i class="bi bi-x-circle me-2"></i>Stock insuficiente';
    } else {
      btnConfirmar.disabled = false;
      btnConfirmar.classList.replace("btn-secondary", "btn-success");
      btnConfirmar.innerHTML =
        '<i class="bi bi-check-circle me-2"></i>Agregar al carrito';
    }
  }
}

function configurarEventosModal() {
  const btnMas = document.getElementById("btnAumentar");
  const btnMenos = document.getElementById("btnDisminuir");
  const input = document.getElementById("cantidadModal");

  btnMas?.addEventListener("click", () => {
    if (input.value < productoActual.stock) {
      input.value++;
      actualizarTotal();
    }
  });

  btnMenos?.addEventListener("click", () => {
    if (input.value > 1) {
      input.value--;
      actualizarTotal();
    }
  });

  input?.addEventListener("input", () => {
    if (input.value < 1) input.value = 1;
    if (input.value > productoActual.stock) {
      input.value = productoActual.stock;
    }
    actualizarTotal();
  });

  const btnConfirmar = document.getElementById("btnConfirmarCompra");

  btnConfirmar?.addEventListener("click", () => {
    if (!productoActual) return;

    const cantidad = parseInt(document.getElementById("cantidadModal").value);

    agregarAlCarrito(productoActual, cantidad);
    modalCantidad.hide();
  });
}

/************************************************
 * 7️⃣ CARRITO
 ************************************************/

function configurarEventoCarrito() {
  const carritoLink = document.getElementById("carritoLink");

  carritoLink?.addEventListener("click", (e) => {
    e.preventDefault();

    renderizarCarrito(); // (si aún no lo tienes, ahora te explico)
    modalCarrito.show();
  });
}

function renderizarCarrito() {
  const contenedor = document.getElementById("carritoProductos");
  const totalCarrito = document.getElementById("carritoTotal");

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  contenedor.innerHTML = "";
  let total = 0;

  if (carrito.length === 0) {
    contenedor.innerHTML = `
      <div class="text-center text-muted py-4">
        <i class="bi bi-cart-x fs-1"></i>
        <p>El carrito está vacío</p>
      </div>
    `;
    totalCarrito.textContent = "$0";
    return;
  }

  carrito.forEach((item, index) => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;

    contenedor.innerHTML += `
      <div class="d-flex justify-content-between align-items-center border-bottom py-3">
        
        <div class="d-flex gap-3">
          <img src="${item.imagen}" width="70" class="rounded border">
          <div>
            <h6 class="fw-bold mb-1">${item.nombre}</h6>
            <small class="text-muted">
              ${item.cantidad} × ${formatoCOP(item.precio)}
            </small>
            <div class="fw-semibold text-success">$${subtotal.toLocaleString()}</div>
          </div>
        </div>

        <div class="d-flex gap-2 align-items-center">
          <button class="btn btn-sm btn-outline-secondary" onclick="decrementarCantidad(${index})" title="Quitar una unidad">
            <i class="bi bi-dash"></i>
          </button>
          <span class="fw-bold">${item.cantidad}</span>
          <button class="btn btn-sm btn-outline-secondary" onclick="incrementarCantidad(${index})" title="Agregar una unidad">
            <i class="bi bi-plus"></i>
          </button>
          <button class="btn btn-sm btn-danger ms-2" onclick="eliminarDelCarrito(${index})" title="Eliminar producto">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </div>
    `;
  });

  totalCarrito.textContent = `$${total.toLocaleString()}`;
}


function decrementarCantidad(index) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  if (!carrito[index]) return;

  if (carrito[index].cantidad > 1) {
    carrito[index].cantidad--;
  } else {
    carrito.splice(index, 1);
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  renderizarCarrito();
  actualizarContadorCarrito();
}

function incrementarCantidad(index) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  if (!carrito[index]) return;

  // ⛔ validar stock
  if (carrito[index].cantidad + 1 > carrito[index].stock) {
    Swal.fire({
      icon: "warning",
      title: "Stock insuficiente",
      text: `Solo hay ${carrito[index].stock} unidades disponibles`,
    });
    return;
  }

  carrito[index].cantidad++;
  localStorage.setItem("carrito", JSON.stringify(carrito));

  renderizarCarrito();
  actualizarContadorCarrito();
}

function eliminarDelCarrito(index) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  if (!carrito[index]) return;

  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));

  renderizarCarrito();
  actualizarContadorCarrito();
}

function agregarAlCarrito(producto, cantidad) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const existente = carrito.find((p) => p.id === producto.id);

  if (existente) {
    const nuevaCantidad = existente.cantidad + cantidad;

    // ❌ No permitir superar stock
    if (nuevaCantidad > producto.stock) {
      Swal.fire({
        icon: "error",
        title: "Stock insuficiente",
        text: `Solo hay ${producto.stock} unidades disponibles`,
      });
      return;
    }

    existente.cantidad = nuevaCantidad;
  } else {
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      unidad: producto.unidad,
      imagen: producto.imagen,
      stock: producto.stock,
      cantidad: cantidad,
    });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContadorCarrito();

  Swal.fire({
    toast: true,
    icon: "success",
    title: "Producto agregado",
    showConfirmButton: false,
    timer: 1200,
  });
}



function actualizarContadorCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const badge = document.getElementById("badgeCarrito");
  const total = carrito.reduce((a, b) => a + b.cantidad, 0);
  badge.style.display = total ? "inline-block" : "none";
  badge.textContent = total;
}

function comprarAhora() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  if (carrito.length === 0) {
    Swal.fire({
      icon: "warning",
      title: "Carrito vacío",
      text: "Agrega al menos un producto para continuar",
    });
    return;
  }

  // 👉 misma redirección que antes
  window.location.href = "/html/pedido.html";
}


/************************************************
 * 8️⃣ EVENT DELEGATION (BOTONES DINÁMICOS)
 ************************************************/
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-abrir-modal");
  if (!btn) return;

  const producto = {
    id: Number(btn.dataset.id),
    nombre: btn.dataset.nombre,
    precio: Number(btn.dataset.precio),
    unidad: btn.dataset.unidad,
    imagen: btn.dataset.imagen,
    stock: Number(btn.dataset.stock),
  };

  if (producto.stock <= 0) {
    Swal.fire("Producto agotado", "", "error");
    return;
  }

  abrirModalProducto(producto);
});

/************************************************
 * 9️⃣ INIT
 ************************************************/
document.addEventListener("DOMContentLoaded", () => {
  renderizarProductosMasVendidos();
  renderizarProductosPorCategoria();

  modalCantidad = new bootstrap.Modal(document.getElementById("modalCantidad"));
  modalCarrito = new bootstrap.Modal(document.getElementById("modalCarrito"));
  document.getElementById("btnComprarAhora")?.addEventListener("click", comprarAhora);


  configurarEventosModal();
  configurarEventoCarrito(); // 👈 NUEVO

  actualizarContadorCarrito();
});
