document.addEventListener("DOMContentLoaded", function () {
  
  if(!localStorage.getItem("loginData")){
    location.replace("/html/iniciarSesion.html")
    return;
  }

  if(localStorage.getItem("loginData")) {
    
    const {usuario, password} = JSON.parse(localStorage.getItem("loginData"))
    
    if(usuario !== "Admin1234" && password !== "admin") {
      location.replace("/html/iniciarSesion.html")
      return;
    }
  }
  
  const btnFormulario = document.getElementById("btnFormulario");
  const form = document.getElementById("Formulario");

  btnFormulario.addEventListener("click", function (e) {
    e.preventDefault();

    // Limpiar mensajes de error previos
    limpiarErrores();

    // Validar todos los campos
    if (!validarFormulario()) {
      return; // Detener si hay errores
    }

    const datosFormulario = {};

    // 1️⃣ Tomamos todos los campos del formulario
    form.querySelectorAll("input, select, textarea").forEach((input) => {
      if (input.name === "precio" || input.name === "cantidadDisponible") {
        // Convertir a número inmediatamente
        datosFormulario[input.name] = parseFloat(input.value);
      } else if (input.type === "number") {
        datosFormulario[input.name] = parseInt(input.value);
      } else {
        datosFormulario[input.name] = input.value;
      }

      if (input.name === "imagen") {
        if (input.files && input.files.length > 0) {
          datosFormulario["archivoImagen"] = input.files[0];
        }
      } else {
        datosFormulario[input.name] = input.value;
      }
    });
  
    if (!datosFormulario.archivoImagen) {
      datosFormulario["imagen"] = null;
      enviarProductoABackend(datosFormulario);
      return;
    }

    // Validar tamaño de imagen (máx 3MB)
    if (datosFormulario.archivoImagen.size > 3 * 1024 * 1024) {
      mostrarError("imagen", "La imagen no debe superar los 3MB");
      return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
      datosFormulario["imagen"] = e.target.result;
      delete datosFormulario.archivoImagen;

      enviarProductoABackend(datosFormulario);

    };

    reader.readAsDataURL(datosFormulario.archivoImagen);
  });

  function validarFormulario() {
    let esValido = true;

    // 1. Título (obligatorio)
    const titulo = document.getElementById("titulo");
    if (!titulo.value.trim()) {
      mostrarError("titulo", "El título es obligatorio");
      esValido = false;
    }

    // 2. Fecha de vencimiento (obligatoria)
    const fechaVencimiento = document.getElementById("fechaVencimiento");
    if (!fechaVencimiento.value) {
      mostrarError(
        "fechaVencimiento",
        "La fecha de vencimiento es obligatoria"
      );
      esValido = false;
    } else {
      // Validar que la fecha no sea pasada
      const fechaSeleccionada = new Date(fechaVencimiento.value);
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0); // Resetear horas para comparar solo la fecha

      if (fechaSeleccionada < hoy) {
        mostrarError(
          "fechaVencimiento",
          "La fecha no puede ser anterior a hoy"
        );
        esValido = false;
      }
    }

    // 3. Categoría (obligatoria)
    const categoria = document.getElementById("categoria");
    if (!categoria.value || categoria.value === "Seleccionar categorías") {
      mostrarError("categoria", "Debes seleccionar una categoría");
      esValido = false;
    }

    // 4. Precio (obligatorio)
    const precio = document.getElementById("precio");
    if (!precio.value) {
      mostrarError("precio", "El precio es obligatorio");
      esValido = false;
    } else if (parseFloat(precio.value) <= 0) {
      mostrarError("precio", "El precio debe ser mayor a 0");
      esValido = false;
    }

    // 5. Cantidad disponible (obligatoria)
    const cantidadDisponible = document.getElementById("cantidadDisponible");
    if (!cantidadDisponible.value) {
      mostrarError(
        "cantidadDisponible",
        "La cantidad disponible es obligatoria"
      );
      esValido = false;
    } else if (parseInt(cantidadDisponible.value) < 0) {
      mostrarError("cantidadDisponible", "La cantidad no puede ser negativa");
      esValido = false;
    }

    // 6. Descripción (opcional, pero validar si se ingresa)
    const descripcion = document.getElementById("descripcion");
    if (descripcion.value.trim().length > 500) {
      mostrarError(
        "descripcion",
        "La descripción no puede exceder los 500 caracteres"
      );
      esValido = false;
    }

    // 7. Validar archivo de imagen (opcional, pero si se sube validar tipo)
    const imagen = document.getElementById("imagen");
    if (imagen.files.length > 0) {
      const archivo = imagen.files[0];
      const tiposPermitidos = ["image/jpeg", "image/png", "image/webp"];

      if (!tiposPermitidos.includes(archivo.type)) {
        mostrarError("imagen", "Solo se permiten imágenes JPG, PNG o WEBP");
        esValido = false;
      }
    } else {
      mostrarError("imagen", "La imagen es obligatoria");
    }

    return esValido;
  }

  // FUNCIÓN PARA MOSTRAR ERRORES
  function mostrarError(campoId, mensaje) {
    const campo = document.getElementById(campoId);
    const grupo =
      campo.closest(".mb-3") ||
      campo.closest(".col-md-6") ||
      campo.closest(".input-group")?.parentElement;

    if (grupo) {
      // Crear elemento de error si no existe
      let errorElement = grupo.querySelector(".error-message");

      if (!errorElement) {
        errorElement = document.createElement("div");
        errorElement.className = "error-message text-danger small mt-1";
        grupo.appendChild(errorElement);
      }

      errorElement.textContent = mensaje;

      // Agregar clase de error al campo
      campo.classList.add("is-invalid");
    }
  }

  // FUNCIÓN PARA LIMPIAR ERRORES
  function limpiarErrores() {
    // Remover mensajes de error
    document.querySelectorAll(".error-message").forEach((el) => el.remove());

    // Remover clases de error/éxito de los campos
    form.querySelectorAll("input, select, textarea").forEach((input) => {
      input.classList.remove("is-invalid", "is-valid");
    });
  }

  // VALIDACIÓN EN TIEMPO REAL
  form.querySelectorAll("input, select, textarea").forEach((campo) => {
    campo.addEventListener("blur", function () {
      validarCampoIndividual(this);
    });

    campo.addEventListener("input", function () {
      // Limpiar error cuando el usuario empieza a escribir
      if (this.classList.contains("is-invalid")) {
        const grupo =
          this.closest(".mb-3") ||
          this.closest(".col-md-6") ||
          this.closest(".input-group")?.parentElement;
        const errorElement = grupo?.querySelector(".error-message");
        if (errorElement) {
          errorElement.remove();
          this.classList.remove("is-invalid");
        }
      }
    });
  });

  // FUNCIÓN PARA VALIDACIÓN INDIVIDUAL EN TIEMPO REAL
  function validarCampoIndividual(campo) {
    let esValido = true;
    let mensaje = "";

    switch (campo.id) {
      case "titulo":
        if (!campo.value.trim()) {
          esValido = false;
          mensaje = "El título es obligatorio";
        } else if (campo.value.trim().length < 3) {
          esValido = false;
          mensaje = "El título debe tener al menos 3 caracteres";
        }
        break;

      case "fechaVencimiento":
        if (!campo.value) {
          esValido = false;
          mensaje = "La fecha de vencimiento es obligatoria";
        } else {
          const fechaSeleccionada = new Date(campo.value);
          const hoy = new Date();
          hoy.setHours(0, 0, 0, 0);

          if (fechaSeleccionada < hoy) {
            esValido = false;
            mensaje = "La fecha no puede ser anterior a hoy";
          }
        }
        break;

      case "categoria":
        if (!campo.value || campo.value === "Seleccionar categorías") {
          esValido = false;
          mensaje = "Debes seleccionar una categoría";
        }
        break;

      case "precio":
        if (!campo.value) {
          esValido = false;
          mensaje = "El precio es obligatorio";
        } else if (parseFloat(campo.value) <= 0) {
          esValido = false;
          mensaje = "El precio debe ser mayor a 0";
        }
        break;

      case "cantidadDisponible":
        if (!campo.value) {
          esValido = false;
          mensaje = "La cantidad disponible es obligatoria";
        } else if (parseInt(campo.value) < 0) {
          esValido = false;
          mensaje = "La cantidad no puede ser negativa";
        }
        break;

      case "descripcion":
        if (campo.value.trim().length > 500) {
          esValido = false;
          mensaje = "La descripción no puede exceder los 500 caracteres";
        }
        break;

      case "imagen":
        if (campo.files.length > 0) {
          const archivo = campo.files[0];
          const tiposPermitidos = ["image/jpeg", "image/png", "image/webp"];

          if (!tiposPermitidos.includes(archivo.type)) {
            esValido = false;
            mensaje = "Solo se permiten imágenes JPG, PNG o WEBP";
          } else if (archivo.size > 3 * 1024 * 1024) {
            esValido = false;
            mensaje = "La imagen no debe superar los 3MB";
          }
        }
        break;
    }

    if (!esValido) {
      mostrarError(campo.id, mensaje);
    } else {
      // Marcar como válido
      campo.classList.remove("is-invalid");
      campo.classList.add("is-valid");
    }
  }

  //CONEXIÓN con base de datos.

function enviarProductoABackend(datosFormulario) {
  console.info("Datos recibidos del formulario:", datosFormulario);

  const producto = {
    nombre: datosFormulario.titulo,
    descripcion: datosFormulario.descripcion,
    fechaVencimiento: datosFormulario.fechaVencimiento,
    precioUnitario: Number(datosFormulario.precio),
    unidadDePeso: datosFormulario.unidad,
    stock: datosFormulario.cantidadDisponible,
    imagen: datosFormulario.imagen,
    categoria: {
    idCategoria: Number(document.getElementById("categoria").value)
  }
  };

  fetch("http://localhost:8080/productos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(producto)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Error al guardar el producto en la base de datos");
      }
      return response.json();
    })
    .then(data => {
      console.log("Producto guardado en BD:", data);

      Swal.fire({
        icon: "success",
        title: "Producto creado",
        text: "El producto se guardó correctamente en la base de datos",
        timer: 2500,
        showConfirmButton: false
      });

      form.reset();
      limpiarErrores();
    })
    .catch(error => {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message
      });
    });
}

});
