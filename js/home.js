document.getElementById("formBoletin").addEventListener("submit", function(event) {
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

  const fechaActual = new Date().toLocaleString("es-CO", { timeZone: "America/Bogota" });

  fetch("https://formsubmit.co/ajax/Contacto@tierraviva.co", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: correo,
      fecha_suscripcion: fechaActual
    })
  })
  .then(response => {
    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "¡Suscripción exitosa! 🌿",
        text: "Tu correo fue enviado correctamente. Pronto recibirás novedades.",
        confirmButtonText: "Aceptar"
      });
      document.getElementById("formBoletin").reset();
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al enviar. Intenta más tarde."
      });
    }
  })
  .catch(() => {
    Swal.fire({
      icon: "error",
      title: "Error de conexión",
      text: "No se pudo enviar. Intenta de nuevo."
    });
  });
});