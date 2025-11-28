const productosAgro = [
  {
    id: 9001,
    nombre: "Banano",
    categoria: "Fruta",
    precio: 3200,
    precioOriginal: 4000,
    descuento: 20,
    unidad: "kg",
    imagen: "./assets/images/productos/banano.jpg",
  },
  {
    id: 9002,
    nombre: "Papa Pastusa",
    categoria: "Verdura",
    precio: 1800,
    precioOriginal: 2500,
    descuento: 28,
    unidad: "kg",
    imagen: "./assets/images/productos/papa.jpg",
  },
  {
    id: 9003,
    nombre: "Fríjol Bola Roja",
    categoria: "Legumbre",
    precio: 4800,
    precioOriginal: 6000,
    descuento: 20,
    unidad: "libra",
    imagen: "./assets/images/productos/frijol_bola_roja.jpg",
  },
];

const contenedorAgro = document.getElementById("productos-agro");

productosAgro.forEach((producto) => {
  const col = document.createElement("div");
  col.classList.add("col-md-4");

  col.innerHTML = `
    <div class="card product-card-agro shadow-sm">

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
