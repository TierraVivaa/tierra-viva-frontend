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

const contenedorAgro = document.getElementById("productos-agro");

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

        <p class="unit-agro"></strong></p>

        <p class="old-price">
        Precio por: <strong>${producto.unidad}
          $${producto.precioOriginal.toLocaleString()}
          <span class="discount-agro">-${producto.descuento}%</span>
        </p>

        <h5 class="card-title mb-3">${producto.nombre}</h5>
      <div class="btn-wrapper d-flex justify-content-center">
        <button
          id="add-to-cart-${producto.id}"
          class="btn btn-olimpia add-to-cart-btn px-4"
          data-id="${producto.id}"
          type="button"
        >
          Agregar al carrito
        </button>
      </div>

      </div>
    </div>
  `;

  contenedorAgro.appendChild(col);
});

// Categorías permitidas
const categoriasValidas = [
  "Verduras",
  "Frutas",
  "Tuberculos",
  "Cereales",
  "Granos",
  "Cafe",
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

// 🔥 Cargar productos guardados en LocalStorage
let productosLocal = JSON.parse(localStorage.getItem("productosJSON")) || [];

if (productosLocal.length > 0) {
  productosAgro = [...productosAgro, ...productosLocal];
}

// --------------------------------------------------------------
// 🔥 FUNCION PARA RENDERIZAR LAS SECCIONES DE CATEGORÍAS
// --------------------------------------------------------------

function renderizarProductos() {
  const contenedorSecciones = document.getElementById("contenedor-secciones");
  contenedorSecciones.innerHTML = "";

  // Agrupar productos por categoría
  const productosPorCategoria = {};

  productosAgro.forEach((producto) => {
    const cat = producto.categoria;

    if (!productosPorCategoria[cat]) {
      productosPorCategoria[cat] = [];
    }

    productosPorCategoria[cat].push(producto);
  });

  // Renderizar sección por cada categoría encontrada
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
            
            <h5 class="price-agro">$${
              producto.precio?.toLocaleString() || "0"
            }</h5>

            <p class="unit-agro"></strong></p>

            <p class="old-price">
              Precio por: <strong>${producto.unidad || "N/A"}</strong>
              $${producto.precioOriginal?.toLocaleString() || "0"}
              <span class="discount-agro">-${producto.descuento || 0}%</span>
            </p>

            <h5 class="card-title mb-3">${producto.titulo}</h5>
            <p>${producto.descripcion || ""}</p>

            <div class="btn-wrapper d-flex justify-content-center">
              <button
                id="add-to-cart-${producto.id}"
                class="btn btn-olimpia add-to-cart-btn px-4"
                data-id="${producto.id}"
                type="button"
              >
                Agregar al carrito
              </button>
            </div>

          </div>
        </div>
      `;

      contenedorCategoria.appendChild(col);
    });
  });
}

// Ejecutar render cuando cargue la página
document.addEventListener("DOMContentLoaded", renderizarProductos);
