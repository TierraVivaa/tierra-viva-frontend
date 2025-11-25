document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Limpiar mensajes de error anteriores
    clearErrors();

    // Validar todos los campos
    const isValid = validateForm();

   if (isValid) {
      // Mostrar estado de envío
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Enviando...";
      submitBtn.disabled = true;

      // Preparar datos para Formspree
      const formData = new FormData(form);
      
      // Enviar a Formspree
      fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          // Éxito
          alert("Formulario enviado correctamente. Te contactaremos pronto.");
          form.reset();
        } else {
          // Error del servidor
          throw new Error('Error en el servidor');
        }
      })
      .catch(error => {
        // Error de red o servidor
        alert("Error al enviar el formulario. Por favor, intenta nuevamente.");
        console.error('Error:', error);
      })
      .finally(() => {
        // Restaurar botón
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      });
    }
  });

  function validateForm() {
    let isValid = true;

    // Validar nombre
    const nombre = document.getElementById("nombre");
    if (!nombre.value.trim()) {
      showError(nombre, "El nombre completo es requerido");
      isValid = false;
    } else if (nombre.value.trim().length < 2) {
      showError(nombre, "El nombre debe tener al menos 2 caracteres");
      isValid = false;
    }

    // Validar email
    const email = document.getElementById("email");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
      showError(email, "El correo electrónico es requerido");
      isValid = false;
    } else if (!emailRegex.test(email.value)) {
      showError(email, "Por favor ingresa un correo electrónico válido");
      isValid = false;
    }

    // Validar teléfono
    const telefono = document.getElementById("telefono");
    const telefonoLimpio = telefono.value.replace(/\s/g, "");
    const telefonoRegex = /^\d+$/; // Solo valida que sean números

    if (!telefono.value.trim()) {
      showError(telefono, "El teléfono es requerido");
      isValid = false;
    } else if (!telefonoRegex.test(telefonoLimpio)) {
      showError(telefono, "El teléfono debe contener solo números");
      isValid = false;
    } else if (telefonoLimpio.length < 8) {
      showError(telefono, "El teléfono debe tener mínimo 8 dígitos");
      isValid = false;
    }

    // Validar asunto
    const asunto = document.getElementById("asunto");
    if (!asunto.value.trim()) {
      showError(asunto, "El asunto es requerido");
      isValid = false;
    } else if (asunto.value.trim().length < 5) {
      showError(asunto, "El asunto debe tener al menos 5 caracteres");
      isValid = false;
    }

    // Validar rol
    const rol = document.getElementById("rol");
    if (!rol.value) {
      showError(rol, "Por favor selecciona un rol");
      isValid = false;
    }

    // Validar mensaje
    const mensaje = document.getElementById("mensaje");
    if (!mensaje.value.trim()) {
      showError(mensaje, "El mensaje es requerido");
      isValid = false;
    } else if (mensaje.value.trim().length < 10) {
      showError(mensaje, "El mensaje debe tener al menos 10 caracteres");
      isValid = false;
    }

    return isValid;
  }

  function showError(input, message) {
    input.classList.add("is-invalid");

    // Mostrar mensaje de error
    const errorDiv = input.nextElementSibling;
    if (errorDiv && errorDiv.classList.contains("invalid-feedback")) {
      errorDiv.textContent = message;
      errorDiv.style.display = "block";
    }
  }

  function clearErrors() {
    // Remover clases de error de todos los campos
    const inputs = form.querySelectorAll("input, select, textarea");
    inputs.forEach((input) => {
      input.classList.remove("is-invalid");
    });

    // Ocultar mensajes de error
    const errorMessages = form.querySelectorAll(".invalid-feedback");
    errorMessages.forEach((error) => {
      error.style.display = "none";
    });
  }
});
