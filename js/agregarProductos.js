// El documento se ejecuta cuando el DOM (el HTML) está cargado completamente
document.addEventListener("DOMContentLoaded", function () {

    const btnFormulario = document.getElementById("btnFormulario");
    const form = document.getElementById("Formulario");
    const datosFormulario = {};

    btnFormulario.addEventListener("click", function (e) {
        e.preventDefault();

        form.querySelectorAll("input, select, textarea").forEach(input => {

            if(input.name === "imagen") {
                datosFormulario[input.name] = input.files[0].name;
            }
            else {
                datosFormulario[input.name] = input.value;
            }
        });

        console.info("Datos del formulario: ", datosFormulario);

        // TODO: Enviar los datos al servidor

        // Se ejecuta después de 3 segundos, limpia los campos del formulario
        setTimeout(() => {
            console.log("Limpiando campos del formulario");

            form.reset();

            console.log("Campos limpiados");
        }, 3000);
    });
});