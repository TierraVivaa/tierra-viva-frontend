// El documento se ejecuta cuando el DOM (el HTML) está cargado completamente
document.addEventListener("DOMContentLoaded", function () {

    const btnFormulario = document.getElementById("btnFormulario");
    const form = document.getElementById("Formulario");

    btnFormulario.addEventListener("click", function (e) {
        e.preventDefault();

        const datosFormulario = {};

        // 1️⃣ Tomamos todos los campos del formulario
        form.querySelectorAll("input, select, textarea").forEach(input => {

            if (input.name === "imagen") {
                // Aquí NO guardamos el nombre del archivo como antes
                // La conversión a Base64 la hacemos luego
                if (input.files && input.files.length > 0) {
                    datosFormulario["archivoImagen"] = input.files[0];  // guardamos temporalmente el archivo
                }
            } else {
                datosFormulario[input.name] = input.value;
            }
        });

        // 2️⃣ Creamos ID basado en fecha
        const dateMS = Date.now();
        datosFormulario["id"] = dateMS;

        // 3️⃣ Si NO subió imagen → guardar sin Base64
        if (!datosFormulario.archivoImagen) {
            datosFormulario["imagen"] = null;
            guardarEnLocalStorage(datosFormulario);
            return;
        }

        // 4️⃣ SI hay imagen → Convertirla a Base64
        const reader = new FileReader();

        reader.onload = function (e) {
            datosFormulario["imagen"] = e.target.result;  // ← Base64 lista
            delete datosFormulario.archivoImagen;         // ← Eliminamos el archivo temporal

            guardarEnLocalStorage(datosFormulario);
        };

        reader.readAsDataURL(datosFormulario.archivoImagen);

    });

    // 5️⃣ Función para guardar en LocalStorage
    function guardarEnLocalStorage(datosFormulario) {
        console.info("Datos del formulario FINAL: ", datosFormulario);

        let productos = JSON.parse(localStorage.getItem("productosJSON")) || [];

        productos.push(datosFormulario);
        localStorage.setItem("productosJSON", JSON.stringify(productos));

        alert("Producto añadido correctamente");

        // Limpiar formulario después de 3 segundos
        setTimeout(() => {
            form.reset();
        }, 3000);
    }

});
