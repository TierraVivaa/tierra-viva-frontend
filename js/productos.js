const productosMasVendidos = [
  {
    id: 9001,
    nombre: "Banano",
    categoria: "Fruta",
    precio: 3200,
    precioOriginal: 4000,
    descuento: 20,
    unidad: "kg",
    imagen: "../assets/images/productos/banano.jpg",
  },
  {
    id: 9002,
    nombre: "Papa Pastusa",
    categoria: "Verdura",
    precio: 1800,
    precioOriginal: 2500,
    descuento: 28,
    unidad: "kg",
    imagen: "../assets/images/productos/papa.jpg",
  },
  {
    id: 9003,
    nombre: "Fríjol Bola Roja",
    categoria: "Legumbre",
    precio: 4800,
    precioOriginal: 6000,
    descuento: 20,
    unidad: "libra",
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
    descripcion: "Fríjol bola roja seleccionado.",
    imagen: "../assets/images/CatalogoProducto/frijol.jpg",
    fechaVencimiento: "2026-05-15",
  },
  {
    id: 9006,
    titulo: "Papa Pastusa",
    categoria: "Tuberculos",
    precio: 1800,
    precioOriginal: 2500,
    descuento: 28,
    unidad: "kg",
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
    descripcion: "Tomate fresco ideal para ensaladas y cocina.",
    imagen: "../assets/images/CatalogoProducto/tomate.jpg",
    fechaVencimiento: "2025-12-08",
  },
  {
    id: 9009,
    titulo: "Yuca",
    categoria: "Tuberculos",
    precio: 1700,
    precioOriginal: 2300,
    descuento: 26,
    unidad: "kg",
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
    descripcion: "Zanahoria fresca y crujiente.",
    imagen: "../assets/images/CatalogoProducto/zanahoria.jpg",
    fechaVencimiento: "2025-12-18",
  },
];


function renderizarProductosMasVendidos() {
  const contenedorAgro = document.getElementById("productos-agro");
  if (!contenedorAgro) return;

  contenedorAgro.innerHTML = "";

  productosMasVendidos.forEach((producto) => {
    const col = document.createElement("div");
    col.classList.add("col-md-4");

    col.innerHTML = `
      <div class="card product-card-agro shadow-sm mt-3">
        <img src="${producto.imagen}" class="product-img-agro" alt="${producto.nombre}">
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

// 🔥 Cargar productos guardados en LocalStorage
let productosLocal = JSON.parse(localStorage.getItem("productosJSON")) || [];
console.log(productosLocal);
if (productosLocal.length > 0) {
  productosAgro = [...productosAgro, ...productosLocal];
}
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
          <img src="${producto.imagen}" class="product-img-agro" alt="${producto.titulo}">
          <div class="card-body">
            <h5 class="price-agro">$${(producto.precio || 0).toLocaleString()}</h5>
            <div class="price-block" style="min-height: 45px;">
              <p class="old-price mb-0">
                Precio por: <strong>${producto.unidad || "N/A"}</strong>
                $${producto.precio?.toLocaleString() || "0"}
              </p>
              ${producto.descuento && producto.descuento > 0
                ? `<span class="discount-agro d-inline-block mt-1">-${producto.descuento}%</span>`
                : `<span class="discount-placeholder d-inline-block mt-1" style="height: 20px; display:block;"></span>`}
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
      input.value = parseInt(input.value) + 1;
      actualizarTotal();
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
        const cantidad = parseInt(document.getElementById("cantidadModal").value);
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
  if (inputCantidad) inputCantidad.value = 1;

  actualizarTotal();

  if (modalCantidad) modalCantidad.show();
}

function actualizarTotal() {
  if (!productoActual) return;

  const inputCantidad = document.getElementById("cantidadModal");
  const totalElement = document.getElementById("modalTotal");

  if (!inputCantidad || !totalElement) return;

  const cantidad = parseInt(inputCantidad.value);
  const total = productoActual.precio * cantidad;

  totalElement.textContent = `$${total.toLocaleString()}`;
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

  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarNotificacionExito(producto, cantidad);
  actualizarContadorCarrito();
}

function mostrarNotificacionExito(producto, cantidad) {
  const nombre = producto.titulo || producto.nombre;
  
  if (typeof Swal !== "undefined") {
    Swal.fire({
      icon: "success",
      title: "¡Agregado al carrito!",
      html: `
        <div class="text-start">
          <p><strong>${nombre}</strong></p>
          <p>Cantidad: ${cantidad} ${producto.unidad}</p>
          <p>Total: $${(producto.precio * cantidad).toLocaleString()}</p>
        </div>
      `,
      showConfirmButton: true,
      confirmButtonText: "Continuar",
      confirmButtonColor: "#7ad03a",
      timer: 3000,
    });
  } else {
    alert(
      `✅ ¡Producto agregado!\n\n${cantidad} ${producto.unidad} de "${nombre}"\nTotal: $${(producto.precio * cantidad).toLocaleString()}`
    );
  }
}

function actualizarContadorCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);

  let badge = document.getElementById("badgeCarrito");

  if (!badge) {
    const nav = document.querySelector(".navbar-nav");
    if (nav) {
      const carritoItem = document.createElement("li");
      carritoItem.className = "nav-item";
      carritoItem.innerHTML = `
        <a class="nav-link position-relative" href="#">
          <i class="bi bi-cart3"></i>
          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" id="badgeCarrito">
            ${totalItems}
          </span>
        </a>
      `;
      nav.appendChild(carritoItem);
    }
  } else {
    badge.textContent = totalItems;
    badge.classList.remove("bg-secondary");
    badge.classList.add("bg-danger");
  }
}

// ========== CONFIGURAR BOTONES ==========
function configurarBotonesProductos() {
  const botones = document.querySelectorAll(".btn-abrir-modal");
  console.log(`Encontrados ${botones.length} botones para configurar`);

  botones.forEach((boton) => {
    // Remover event listeners previos
    boton.replaceWith(boton.cloneNode(true));
  });

  // Volver a seleccionar después del clone
  document.querySelectorAll(".btn-abrir-modal").forEach((boton) => {
    boton.addEventListener("click", function () {
      const producto = {
        id: this.getAttribute("data-id"),
        titulo: this.getAttribute("data-nombre"),
        precio: parseFloat(this.getAttribute("data-precio")),
        unidad: this.getAttribute("data-unidad"),
        imagen: this.getAttribute("data-imagen"),
      };
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
  
  console.log("✅ Sistema completamente inicializado");
})