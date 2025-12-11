document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("loginForm");

    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Evita que recargue la pagina

        const usuario = document.getElementById("usuario").value;
        const password = document.getElementById("password").value;

        if (usuario === "Admin1234" && password === "admin") {
            // modal de SweetAlert2 de Éxito
            Swal.fire({
                title: "¡Bienvenido Admin!",
                text: "Acceso concedido al panel de administración.",
                icon: "success",
                confirmButtonText: "Continuar"
            }).then((result) => {
                // Redireccionar solo después de que el usuario haga clic en 'Continuar'
                if (result.isConfirmed) {
                    window.location.replace('../html/agregarProducto.html');
                }
            });

        } else if (usuario === "" || password === "") {
             // SweetAlert2 de Advertencia para campos vacíos
            Swal.fire({
                title: "Campos Requeridos",
                text: "Por favor, ingrese su usuario y contraseña.",
                icon: "warning",
                confirmButtonText: "Aceptar"
            });
        
        } else {
            const loginData = {
                usuario: usuario,
                password: password
            };

            localStorage.setItem("loginData", JSON.stringify(loginData));

            // Reemplazo de alert("Usuario Ingresado") con SweetAlert2 de Información
            Swal.fire({
                title: "Ingreso Exitoso",
                text: "Datos guardados localmente. Redireccionando a la página principal.",
                icon: "info",
                timer: 2500, // Cierra automáticamente después de 2.5 segundos
                showConfirmButton: false // Oculta el botón de confirmación
            }).then(() => {
                // La redirección se ejecuta después de que el temporizador finaliza
                window.location.replace('../index.html');
            });

            form.reset();
        }
    });
});