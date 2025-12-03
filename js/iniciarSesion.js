document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("loginForm");

    form.addEventListener("submit", (e) =>{
        e.preventDefault(); // Evita que recargue la pagina

        const usuario = document.getElementById("usuario").value;
        const password = document.getElementById("password").value;

        if(usuario === "Admin1234" && password === "admin"){
            alert("Bienvenido Admin")
            window.location.replace('../html/agregarProducto.html')
        }else{
            const loginData = {
            usuario: usuario,
            password: password
        };

        localStorage.setItem("loginData",JSON.stringify(loginData));

        alert("Usuario Ingresado");

        window.location.replace('../index.html')

        form.reset();
        }

    })
})