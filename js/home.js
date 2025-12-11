const productosAgro1 = [
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

productosAgro1.forEach((producto) => {
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
\

      </div>
    </div>
  `;

  contenedorAgro.appendChild(col);
});
document
  .getElementById("formBoletin")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const correo = document.getElementById("correo").value;
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);

    if (!emailValido) {
      Swal.fire({
        icon: "error",
        title: "Correo inválido",
        text: "Por favor escribe un correo válido.",
      });
      return;
    }

    const fechaActual = new Date().toLocaleString("es-CO", {
      timeZone: "America/Bogota",
    });

    fetch("https://formsubmit.co/ajax/Contacto@tierraviva.co", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: correo,
        fecha_suscripcion: fechaActual,
      }),
    })
      .then((response) => {
        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: "¡Suscripción exitosa! 🌿",
            text: "Tu correo fue enviado correctamente. Pronto recibirás novedades.",
            confirmButtonText: "Aceptar",
          });
          document.getElementById("formBoletin").reset();
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un problema al enviar. Intenta más tarde.",
          });
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Error de conexión",
          text: "No se pudo enviar. Intenta de nuevo.",
        });
      });
  });

