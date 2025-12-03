// El documento se ejecuta cuando el DOM (el HTML) está cargado completamente
document.addEventListener("DOMContentLoaded", function () {

    const btnFormulario = document.getElementById("btnFormulario");
    const form = document.getElementById("Formulario");
    const datosFormulario = {};

    btnFormulario.addEventListener("click", function (e) {
        e.preventDefault();

        // Cogemos todos los campos y les sacamos el value
        form.querySelectorAll("input, select, textarea").forEach(input => {

            if(input.name === "imagen") {
                // Añadimos la imagen si el usuario subió una imagen
                if(input.files) {
                    datosFormulario[input.name] = input.files[0].name;
                }
            }
            else {
                datosFormulario[input.name] = input.value;
            }
        });

        // Obtenemos la fecha actual en milisegundos
        const dateMS = Date.now();

        // La añadimos como id, para despues borrar mas facilmente
        datosFormulario["id"] = dateMS;
        console.info("Datos del formulario: ", datosFormulario);
        
        let productos = JSON.parse(localStorage.getItem("productosJSON")) || [];
        productos.push(datosFormulario);
        localStorage.setItem("productosJSON", JSON.stringify(productos));
        alert("Producto añadido correctamente")

        // Se ejecuta después de 3 segundos, limpia los campos del formulario
        setTimeout(() => {
            console.log("Limpiando campos del formulario");

            form.reset();

            console.log("Campos limpiados");
        }, 3000);
    });
});
