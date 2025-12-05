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

                if (input.files && input.files.length > 0) {
                    datosFormulario["archivoImagen"] = input.files[0];  // guardamos temporalmente el archivo
                }
            } else {
                datosFormulario[input.name] = input.value;
            }
        });

        const dateMS = Date.now();
        datosFormulario["id"] = dateMS;


        if (!datosFormulario.archivoImagen) {
            datosFormulario["imagen"] = null;
            guardarEnLocalStorage(datosFormulario);
            return;
        }


        const reader = new FileReader();

        reader.onload = function (e) {
            datosFormulario["imagen"] = e.target.result;  
            delete datosFormulario.archivoImagen;      

            guardarEnLocalStorage(datosFormulario);
        };

        reader.readAsDataURL(datosFormulario.archivoImagen);

    });

    function guardarEnLocalStorage(datosFormulario) {
        console.info("Datos del formulario FINAL: ", datosFormulario);

        let productos = JSON.parse(localStorage.getItem("productosJSON")) || [];

        productos.push(datosFormulario);
        localStorage.setItem("productosJSON", JSON.stringify(productos));

        alert("Producto añadido correctamente");

        setTimeout(() => {
            form.reset();
        }, 3000);
    }

});
