document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("registroForm");

    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Evita recargar la página

        const nombreInput = document.getElementById("nombre");
        const usuarioInput = document.getElementById("usuarioReg");
        const emailInput = document.getElementById("emailReg");
        const numeroInput = document.getElementById("numeroReg");
        const passwordInput = document.getElementById("passwordReg");

        let formularioValido = true;

        //#region ---- VALIDACIONES ----
        if (nombreInput.value.trim() === "") {
            nombreInput.classList.add("is-invalid");
            formularioValido = false;
        } else {
            nombreInput.classList.remove("is-invalid");
            nombreInput.classList.add("is-valid");
        }

        if (usuarioInput.value.trim() === "") {
            usuarioInput.classList.add("is-invalid");
            formularioValido = false;
        } else {
            usuarioInput.classList.remove("is-invalid");
            usuarioInput.classList.add("is-valid");
        }

        if (emailInput.value.trim() === "" || !emailInput.value.includes("@")) {
            emailInput.classList.add("is-invalid");
            formularioValido = false;
        } else {
            emailInput.classList.remove("is-invalid");
            emailInput.classList.add("is-valid");
        }

        if (numeroInput.value !== "" && isNaN(numeroInput.value)) {
            numeroInput.classList.add("is-invalid");
            formularioValido = false;
        } else {
            numeroInput.classList.remove("is-invalid");
            if (numeroInput.value !== "") numeroInput.classList.add("is-valid");
        }

        if (passwordInput.value.trim() === "") {
            passwordInput.classList.add("is-invalid");
            formularioValido = false;
        } else {
            passwordInput.classList.remove("is-invalid");
            passwordInput.classList.add("is-valid");
        }

        //#endregion ---- VALIDACIONES ----
        
        if (!formularioValido) {
            return;
        }

        const newUser = {
            nombre: nombreInput.value,
            usuario: usuarioInput.value,
            email: emailInput.value,
            numeroCelular: numeroInput.value,
            contrasena: passwordInput.value
        };

        // ToDo Verificar si ya existe usuario
        // const existe = usuarios.some(u => u.usuario === usuarioInput.value);

        
        // if (existe) {
        //     alert("Ese nombre de usuario ya está registrado");
        //     usuarioInput.classList.add("is-invalid");
        //     return;
        // }

        fetch("http://localhost:8080/usuarios", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newUser)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al guardar el producto en la base de datos");
            }
            return response.json();
        })
        .then(data => {
            console.log("Usuario guardado en BD:", data);
            
            Swal.fire({
                icon: "success",
                title: "Usuario creado",
                text: "El usuario se registró satisfactoriamente"
            }).then((result) => {
                // Redireccionar solo después de que el usuario haga clic en 'Continuar'
                if (result.isConfirmed) {
                    form.reset();
                    window.location.pathname = "/html/iniciarSesion.html";
                }
            });
        })
        .catch(error => {
            console.error("Error:", error);

            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Error al registrar el usuario"
            });
            
            form.reset();
            
            document
                .querySelectorAll(".is-valid")
                .forEach(el => el.classList.remove("is-valid"));
        });
    });
});

const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("passwordReg");
const icon = togglePassword.querySelector("i");

togglePassword.addEventListener("click", () => {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        icon.classList.remove("bi-eye");
        icon.classList.add("bi-eye-slash");
    } else {
        passwordInput.type = "password";
        icon.classList.remove("bi-eye-slash");
        icon.classList.add("bi-eye");
    }
});