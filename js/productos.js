const productosMasVendidos = [
  {
    id: 1001,
    nombre: "Banano",
    categoria: "Fruta",
    precio: 3200,
    precioOriginal: 4000,
    descuento: 20,
    unidad: "kg",
    cantidadDisponible: 150, // Agregado
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
    cantidadDisponible: 200, // Agregado
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
    cantidadDisponible: 80, // Agregado
    imagen: "../assets/images/productos/frijol_bola_roja.jpg",
  },
];

// Array de productos base (simula BD)
let productosAgro = [
  {
    id: 9001,
    titulo: "Banano",
    categoria: "Frutas",
    precio: 3200,
    precioOriginal: 3800,
    descuento: 16,
    unidad: "kg",
    cantidadDisponible: 120, // Agregado
    descripcion: "Banano fresco de alta calidad.",
    imagen: "../assets/images/CatalogoProducto/banano.jpg",
    fechaVencimiento: "2025-12-20",
  },
  {
    id: 9002,
    titulo: "Café Pergamino",
    categoria: "Cafe",
    precio: 18000,
    precioOriginal: 20000,
    descuento: 10,
    unidad: "libra",
    cantidadDisponible: 50, // Agregado
    descripcion: "Café artesanal tostado y molido.",
    imagen: "../assets/images/CatalogoProducto/cafe.jpg",
    fechaVencimiento: "2026-03-01",
  },
  {
    id: 9003,
    titulo: "Cebolla Cabezona",
    categoria: "Verduras",
    precio: 2200,
    precioOriginal: 2800,
    descuento: 21,
    unidad: "kg",
    cantidadDisponible: 180, // Agregado
    descripcion: "Cebolla cabezona fresca ideal para cocinar.",
    imagen: "../assets/images/CatalogoProducto/cebolla_cabezona.jpg",
    fechaVencimiento: "2025-12-10",
  },
  {
    id: 9004,
    titulo: "Fresas",
    categoria: "Frutas",
    precio: 8500,
    precioOriginal: 9500,
    descuento: 10,
    unidad: "libra",
    cantidadDisponible: 35, // Agregado
    descripcion: "Fresas rojas dulces y frescas.",
    imagen: "../assets/images/CatalogoProducto/fresas.jpg",
    fechaVencimiento: "2025-12-08",
  },
  {
    id: 9005,
    titulo: "Fríjol Rojo",
    categoria: "Granos",
    precio: 4200,
    precioOriginal: 5000,
    descuento: 16,
    unidad: "libra",
    cantidadDisponible: 90, // Agregado
    descripcion: "Fríjol bola roja seleccionado.",
    imagen: "../assets/images/CatalogoProducto/frijol.jpg",
    fechaVencimiento: "2026-05-15",
  },
  {
    id: 9006,
    titulo: "Papa Pastusa",
    categoria: "Tubérculos",
    precio: 1800,
    precioOriginal: 2500,
    descuento: 28,
    unidad: "kg",
    cantidadDisponible: 250, // Agregado
    descripcion: "Papa pastusa fresca ideal para cocinar.",
    imagen: "../assets/images/CatalogoProducto/papa.jpg",
    fechaVencimiento: "2025-12-15",
  },
  {
    id: 9007,
    titulo: "Papaya",
    categoria: "Frutas",
    precio: 3500,
    precioOriginal: 4200,
    descuento: 17,
    unidad: "kg",
    cantidadDisponible: 45, // Agregado
    descripcion: "Papaya dulce lista para consumir.",
    imagen: "../assets/images/CatalogoProducto/papaya.jpg",
    fechaVencimiento: "2025-12-12",
  },
  {
    id: 9008,
    titulo: "Tomate Chonto",
    categoria: "Verduras",
    precio: 2700,
    precioOriginal: 3400,
    descuento: 20,
    unidad: "kg",
    cantidadDisponible: 110, // Agregado
    descripcion: "Tomate fresco ideal para ensaladas y cocina.",
    imagen: "../assets/images/CatalogoProducto/tomate.jpg",
    fechaVencimiento: "2025-12-08",
  },
  {
    id: 9009,
    titulo: "Yuca",
    categoria: "Tubérculos",
    precio: 1700,
    precioOriginal: 2300,
    descuento: 26,
    unidad: "kg",
    cantidadDisponible: 95, // Agregado
    descripcion: "Yuca fresca de excelente calidad.",
    imagen: "../assets/images/CatalogoProducto/yuca.jpg",
    fechaVencimiento: "2025-12-16",
  },
  {
    id: 9010,
    titulo: "Zanahoria",
    categoria: "Verduras",
    precio: 1500,
    precioOriginal: 2100,
    descuento: 28,
    unidad: "kg",
    cantidadDisponible: 160, // Agregado
    descripcion: "Zanahoria fresca y crujiente.",
    imagen: "../assets/images/CatalogoProducto/zanahoria.jpg",
    fechaVencimiento: "2025-12-18",
  },
];

// Variables globales
let productoActual = null;
let modalCantidad = null;

function renderizarProductosMasVendidos() {
  const contenedorAgro = document.getElementById("productos-agro");
  if (!contenedorAgro) return;

  contenedorAgro.innerHTML = "";

  productosMasVendidos.forEach((producto) => {
    const col = document.createElement("div");
    col.classList.add("col-md-4");

    col.innerHTML = `
      <div class="card product-card-agro shadow-sm mt-3">
        <img src="${producto.imagen}" class="product-img-agro" alt="${
      producto.nombre
    }">
        <div class="card-body">
          <h5 class="price-agro">$${producto.precio.toLocaleString()}</h5>
          <p class="old-price">
            Precio por: <strong>${producto.unidad}</strong>
            $${producto.precioOriginal.toLocaleString()}
            <span class="discount-agro">-${producto.descuento}%</span>
          </p>
          <h5 class="card-title mb-3">${producto.nombre}</h5>
          <div class="btn-wrapper d-flex justify-content-center">
            <button 
              class="btn btn-success btn-abrir-modal"
              data-id="${producto.id}"
              data-nombre="${producto.nombre}" 
              data-precio="${producto.precio}"
              data-unidad="${producto.unidad}"
              data-imagen="${producto.imagen}"
              data-stock="${producto.cantidadDisponible || 0}"
              type="button"
            >
              <i class="bi bi-cart-plus me-1"></i>Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    `;

    contenedorAgro.appendChild(col);
  });
}

//  Cargar productos guardados en LocalStorage
let productosLocal = JSON.parse(localStorage.getItem("productosJSON")) || [];

productosLocal = productosLocal.map((producto) => ({
  ...producto,
  precio:
    typeof producto.precio === "string"
      ? parseFloat(producto.precio)
      : producto.precio,
  precioOriginal:
    typeof producto.precioOriginal === "string"
      ? parseFloat(producto.precioOriginal)
      : producto.precioOriginal || parseFloat(producto.precio) * 1.2,
  cantidadDisponible:
    typeof producto.cantidadDisponible === "string"
      ? parseInt(producto.cantidadDisponible)
      : producto.cantidadDisponible,
}));

console.log("Productos convertidos:", productosLocal);

function renderizarProductosPorCategoria() {
  const contenedorSecciones = document.getElementById("contenedor-secciones");
  if (!contenedorSecciones) return;

  contenedorSecciones.innerHTML = "";

  // Cargar productos del localStorage
  let productosLocal = JSON.parse(localStorage.getItem("productosJSON")) || [];
  let todosProductos = [...productosAgro, ...productosLocal];

  // Agrupar productos por categoría
  const productosPorCategoria = {};
  todosProductos.forEach((producto) => {
    const cat = producto.categoria;
    if (!productosPorCategoria[cat]) {
      productosPorCategoria[cat] = [];
    }
    productosPorCategoria[cat].push(producto);
  });

  // Renderizar cada categoría
  Object.keys(productosPorCategoria).forEach((categoria) => {
    const seccion = document.createElement("div");
    seccion.classList.add("mb-5");

    seccion.innerHTML = `
      <h3 class="mt-4 mb-3">${categoria}</h3>
      <div class="row" id="cat-${categoria}"></div>
    `;

    contenedorSecciones.appendChild(seccion);

    const contenedorCategoria = seccion.querySelector(`#cat-${categoria}`);

    productosPorCategoria[categoria].forEach((producto) => {
      const col = document.createElement("div");
      col.classList.add("col-md-4");

      col.innerHTML = `
        <div class="card product-card-agro shadow-sm mt-3">
          <img src="${producto.imagen}" class="product-img-agro" alt="${
        producto.titulo
      }">
          <div class="card-body">
            <h5 class="price-agro">$         ${
              parseFloat(producto.precio || 0) % 1 === 0
                ? parseFloat(producto.precio || 0).toLocaleString()
                : parseFloat(producto.precio || 0).toFixed(2)
            }</h5>
            <div class="price-block" style="min-height: 45px;">
              <p class="old-price mb-0">
                Precio por: <strong>${producto.unidad || "N/A"}</strong>
    $${
      parseFloat(producto.precio || 0) % 1 === 0
        ? parseFloat(producto.precio || 0).toLocaleString()
        : parseFloat(producto.precio || 0).toFixed(2)
    }
              </p>
              ${
                producto.descuento && producto.descuento > 0
                  ? `<span class="discount-agro d-inline-block mt-1">-${producto.descuento}%</span>`
                  : `<span class="discount-placeholder d-inline-block mt-1" style="height: 20px; display:block;"></span>`
              }
            </div>
            <h5 class="card-title mb-3">${producto.titulo}</h5>
            <p>${producto.descripcion || ""}</p>
            <div class="btn-wrapper d-flex justify-content-center">
              <button 
                class="btn btn-success btn-abrir-modal"
                data-id="${producto.id}"
                data-nombre="${producto.titulo}"
                data-precio="${producto.precio}"
                data-unidad="${producto.unidad}"
                data-imagen="${producto.imagen}"
                data-stock="${producto.cantidadDisponible || 0}" 
                type="button"
              >
                <i class="bi bi-cart-plus me-1"></i>Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      `;

      contenedorCategoria.appendChild(col);
    });
  });
}

// ========== FUNCIONES DEL MODAL ==========
function configurarEventosModal() {
  const btnAumentar = document.getElementById("btnAumentar");
  const btnDisminuir = document.getElementById("btnDisminuir");
  const cantidadModal = document.getElementById("cantidadModal");
  const btnConfirmar = document.getElementById("btnConfirmarCompra");

  if (btnAumentar) {
    btnAumentar.addEventListener("click", function () {
      const input = document.getElementById("cantidadModal");
      const stockActual = productoActual ? productoActual.stock : 0;

      // Validar que no supere el stock disponible
      if (parseInt(input.value) < stockActual) {
        input.value = parseInt(input.value) + 1;
        actualizarTotal();
      }
    });
  }

  if (btnDisminuir) {
    btnDisminuir.addEventListener("click", function () {
      const input = document.getElementById("cantidadModal");
      if (input.value > 1) {
        input.value = parseInt(input.value) - 1;
        actualizarTotal();
      }
    });
  }

  if (cantidadModal) {
    cantidadModal.addEventListener("input", function () {
      if (this.value < 1) this.value = 1;
      actualizarTotal();
    });
  }

  if (btnConfirmar) {
    btnConfirmar.addEventListener("click", function () {
      if (productoActual) {
        const cantidad = parseInt(
          document.getElementById("cantidadModal").value
        );
        agregarAlCarrito(productoActual, cantidad);
        if (modalCantidad) modalCantidad.hide();
      }
    });
  }
}

function abrirModalProducto(producto) {
  productoActual = producto;

  const imagen = document.getElementById("modalProductoImagen");
  const nombre = document.getElementById("modalProductoNombre");
  const precio = document.getElementById("modalProductoPrecio");
  const unidad = document.getElementById("modalProductoUnidad");

  if (imagen) imagen.src = producto.imagen;
  if (nombre) nombre.textContent = producto.titulo || producto.nombre; // Soporta ambos
  if (precio) precio.textContent = `$${producto.precio.toLocaleString()}`;
  if (unidad) unidad.textContent = producto.unidad;

  const inputCantidad = document.getElementById("cantidadModal");
  if (inputCantidad) {
    inputCantidad.value = 1;
    inputCantidad.max = producto.stock || 0;
  }

  actualizarTotal();

  if (modalCantidad) modalCantidad.show();
}

function actualizarTotal() {
  if (!productoActual) return;

  const inputCantidad = document.getElementById("cantidadModal");
  const totalElement = document.getElementById("modalTotal");
  const stockActual = productoActual.stock || 0;

  if (!inputCantidad || !totalElement) return;

  const cantidad = parseInt(inputCantidad.value);
  const total = productoActual.precio * cantidad;

  // Actualizar mensaje de stock
  const stockInfo = document.getElementById("stockInfo");
  if (!stockInfo) {
    // Crear elemento para mostrar stock
    const modalBody = document.querySelector(".modal-body");
    const stockDiv = document.createElement("div");
    stockDiv.id = "stockInfo";
    stockDiv.className = "alert alert-info py-2 mb-3";
    stockDiv.innerHTML = `
      <small>
        <i class="bi bi-info-circle me-1"></i>
        Stock disponible: <strong>${stockActual}</strong> unidades
      </small>
    `;

    // Insertar después del primer elemento del modal body
    const firstChild = modalBody.firstChild;
    if (firstChild) {
      modalBody.insertBefore(stockDiv, firstChild.nextSibling);
    }
  } else {
    stockInfo.innerHTML = `
      <small>
        <i class="bi bi-info-circle me-1"></i>
        Stock disponible: <strong>${stockActual}</strong> unidades
        ${
          cantidad > stockActual
            ? ' <span class="text-danger">(No hay suficiente stock)</span>'
            : ""
        }
      </small>
    `;
  }

  totalElement.textContent = `$${total.toLocaleString()}`;

  // Deshabilitar botón si supera el stock
  const btnConfirmar = document.getElementById("btnConfirmarCompra");
  if (btnConfirmar) {
    if (cantidad > stockActual || cantidad <= 0) {
      btnConfirmar.disabled = true;
      btnConfirmar.innerHTML =
        '<i class="bi bi-x-circle me-2"></i>Stock insuficiente';
      btnConfirmar.classList.remove("btn-success");
      btnConfirmar.classList.add("btn-secondary");
    } else {
      btnConfirmar.disabled = false;
      btnConfirmar.innerHTML =
        '<i class="bi bi-check-circle me-2"></i>Agregar al carrito';
      btnConfirmar.classList.remove("btn-secondary");
      btnConfirmar.classList.add("btn-success");
    }
  }
}

// ========== FUNCIONES DEL CARRITO ==========
function agregarAlCarrito(producto, cantidad) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const productoExistente = carrito.find((item) => item.id == producto.id);

  if (productoExistente) {
    productoExistente.cantidad += cantidad;
  } else {
    carrito.push({
      id: producto.id,
      nombre: producto.titulo || producto.nombre,
      precio: producto.precio,
      unidad: producto.unidad,
      imagen: producto.imagen,
      cantidad: cantidad,
      fecha: new Date().toISOString(),
    });
  }
  console.log("Data guardada", carrito);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarNotificacionExito(producto, cantidad);
  actualizarContadorCarrito();
}

function mostrarNotificacionExito(producto, cantidad) {
  const nombre = producto.titulo || producto.nombre;

  // Mensaje para ambos casos
  const mensaje = `${cantidad} ${producto.unidad} de "${nombre}"\nTotal: $${(
    producto.precio * cantidad
  ).toLocaleString()}`;

  if (window.Swal && typeof Swal.fire === "function") {
    // SweetAlert2 disponible - Toast
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "¡Producto agregado!",
      text: mensaje,
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
    });
  }
}
function actualizarContadorCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);

  let badge = document.getElementById("badgeCarrito");

  if (totalItems > 0) {
    if (!badge) {
      // Si no existe el badge, lo creamos
      const carritoLink = document.getElementById("carritoLink");
      if (carritoLink) {
        // Creamos el badge y lo agregamos al enlace del carrito
        badge = document.createElement("span");
        badge.id = "badgeCarrito";
        badge.className =
          "position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger";
        badge.textContent = totalItems;
        badge.style.fontSize = "0.7rem";
        badge.style.minWidth = "20px";
        badge.style.height = "20px";
        badge.style.display = "flex";
        badge.style.alignItems = "center";
        badge.style.justifyContent = "center";

        carritoLink.appendChild(badge);
      }
    } else {
      // Si ya existe, actualizamos el contenido
      badge.textContent = totalItems;
      badge.style.display = "flex";
      badge.classList.remove("bg-secondary");
      badge.classList.add("bg-danger");
    }
  } else {
    // Si no hay items, ocultamos el badge
    if (badge) {
      badge.style.display = "none";
    }
  }
}

// Opcional: función para redirigir al carrito cuando se haga clic
function configurarCarrito() {
  const carritoLink = document.getElementById("carritoLink");
  if (carritoLink) {
    carritoLink.addEventListener("click", function (e) {
      e.preventDefault();
      // Aquí puedes agregar la redirección a la página del carrito
      // window.location.href = "./carrito.html";
    });
  }

  // Actualizar el contador al cargar la página
  actualizarContadorCarrito();
}

// Llama a configurarCarrito cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", function () {
  configurarCarrito();
});


// ========== CONFIGURAR BOTONES ==========
function configurarBotonesProductos() {
  const botones = document.querySelectorAll(".btn-abrir-modal");

  document.querySelectorAll(".btn-abrir-modal").forEach((boton) => {
    boton.addEventListener("click", function () {
      const producto = {
        id: this.getAttribute("data-id"),
        titulo: this.getAttribute("data-nombre"),
        precio: parseFloat(this.getAttribute("data-precio")),
        unidad: this.getAttribute("data-unidad"),
        imagen: this.getAttribute("data-imagen"),
        stock: parseInt(this.getAttribute("data-stock") || 0), // Agregar stock
      };

      // Validar stock antes de abrir el modal
      if (producto.stock <= 0) {
        if (typeof Swal !== "undefined") {
          Swal.fire({
            icon: "error",
            title: "Producto agotado",
            text: "Lo sentimos, este producto no está disponible",
            confirmButtonText: "Entendido",
          });
        } else {
          alert("❌ Este producto está agotado");
        }
        return;
      }

      console.log("Producto seleccionado:", producto);
      abrirModalProducto(producto);
    });
  });
}

// ========== INICIALIZACIÓN ==========
// UN SOLO DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
  console.log("1. DOM cargado - Iniciando...");

  // 1. Renderizar productos
  renderizarProductosMasVendidos();
  renderizarProductosPorCategoria();

  // 2. Inicializar modal
  const modalElement = document.getElementById("modalCantidad");
  if (modalElement) {
    modalCantidad = new bootstrap.Modal(modalElement);
    console.log("2. Modal inicializado");
  }

  // 3. Configurar eventos
  configurarEventosModal();
  configurarBotonesProductos();

  // 4. Contador del carrito
  actualizarContadorCarrito();
});

// =====================
// MODAL DEL CARRITO
// =====================

// Abrir modal al hacer click en el icono del carrito
document.getElementById("btnCarrito")?.addEventListener("click", () => {
  renderizarCarrito();
  const modal = new bootstrap.Modal(document.getElementById("modalCarrito"));
  modal.show();
});

// Renderizar items dentro del modal
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
            <small class="text-muted">${item.cantidad} × $${item.precio.toLocaleString()}</small>
            <div class="fw-semibold text-success">$${subtotal.toLocaleString()}</div>
          </div>
        </div>

        <button class="btn btn-sm btn-danger" onclick="eliminarDelCarrito(${index})">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    `;
  });

  totalCarrito.textContent = `$${total.toLocaleString()}`;
}

// Eliminar producto
function eliminarDelCarrito(index) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));

  renderizarCarrito();
  actualizarContadorCarrito();
}

// BOTÓN COMPRAR AHORA → Redirige a otra vista
document.getElementById("btnComprarAhora")?.addEventListener("click", () => {
  window.location.href = ""; 
});


