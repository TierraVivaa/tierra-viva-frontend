document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("registroForm");

    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Evita recargar la página

        const nombre = document.getElementById("nombre").value;
        const usuario = document.getElementById("usuarioReg").value;
        const email = document.getElementById("emailReg").value;
        const numero = document.getElementById("numeroReg").value; // opcional
        const password = document.getElementById("passwordReg").value;

        const newUser = {
            nombre,
            usuario,
            email,
            numero,
            password
        };

        // Inicializar array si no existe
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        // Verificar si ya existe usuario
        const existe = usuarios.some(u => u.usuario === usuario);

        if (existe) {
            alert("Ese nombre de usuario ya está registrado");
            return;
        }

        // Guardar
        usuarios.push(newUser);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        alert("Cuenta creada exitosamente");

        form.reset();
    });
});
