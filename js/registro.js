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

        // ---- VALIDACIONES ----
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

        
        if (!formularioValido) {
            return;
        }

        const newUser = {
            nombre: nombreInput.value,
            usuario: usuarioInput.value,
            email: emailInput.value,
            numero: numeroInput.value,
            password: passwordInput.value
        };

        // Inicializar array si no existe
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        // Verificar si ya existe usuario
        const existe = usuarios.some(u => u.usuario === usuarioInput.value);

        if (existe) {
            alert("Ese nombre de usuario ya está registrado");
            usuarioInput.classList.add("is-invalid");
            return;
        }

        // Guardar
        usuarios.push(newUser);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        alert("Cuenta creada exitosamente");

        form.reset();
        document
            .querySelectorAll(".is-valid")
            .forEach(el => el.classList.remove("is-valid"));
    });
});
