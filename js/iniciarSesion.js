document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  localStorage.removeItem("loginData"); // limpiamos el localstorage

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Evita que recargue la pagina

    const usuario = document.getElementById("usuario").value;
    const contrasena = document.getElementById("password").value;

    if (usuario === "" || contrasena === "") {
      // SweetAlert2 de Advertencia para campos vacíos
      Swal.fire({
        title: "Campos Requeridos",
        text: "Por favor, ingrese su usuario y contraseña.",
        icon: "warning",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    localStorage.setItem("loginData", JSON.stringify({usuario, contrasena}));

    if (usuario === "Admin1234" && contrasena === "admin") {
      // modal de SweetAlert2 de Éxito
      Swal.fire({
        title: "¡Bienvenido Admin!",
        text: "Acceso concedido al panel de administración.",
        icon: "success",
        confirmButtonText: "Continuar",
      }).then((result) => {
        // Redireccionar solo después de que el usuario haga clic en 'Continuar'
        if (result.isConfirmed) {
          window.location.replace("../html/gestionProductos.html");
        }
      });
    } else {

      fetch("http://localhost:8080/auth/loginConDTO", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({usuario, contrasena})
      })
        .then(response => {
          if (!response.ok) {
            throw new Error("Credenciales inválidas");
          }
          
          return response.text();
        })
        .then(data => {
          console.log("Bearer", data);
          let token = "Bearer " + data;
          
          localStorage.setItem("token", JSON.stringify({token}));

          Swal.fire({
            title: "Ingreso Exitoso",
            text: "Redireccionando a la página principal.",
            icon: "info",
            timer: 2000, // Cierra automáticamente después de 2 segundos
            showConfirmButton: false // Oculta el botón de confirmación
          }).then(() => {
              // La redirección se ejecuta después de que el temporizador finaliza
              window.location.replace('../index.html');
          });
        })
        .catch(error => {
          Swal.fire({
            title: "Usuario invalido",
            text: "Por favor, ingrese su usuario y contraseña validos.",
            icon: "warning",
            confirmButtonText: "Aceptar",
          });
          form.reset();
        });
    }
  });
});