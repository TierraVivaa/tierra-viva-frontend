document.addEventListener("DOMContentLoaded", () => {

  if(!document.getElementById("navbarNav")){
    return;
  }
  
  if(localStorage.getItem("loginData")) {

    const {usuario, contrasena} = JSON.parse(localStorage.getItem("loginData"))
    
    if(usuario === "Admin1234" && contrasena === "admin") {
      // Si ingresa el admin se añade el link "AGREGAR PRODUCTO" a la navbar 
      const padre = document.getElementById("navbarNav").children[0]

      const li = document.createElement("li")
      li.classList.add("nav-item")

      const a = document.createElement("a")
      a.classList.add("nav-link", "fw-semibold")
      a.href = "/html/agregarProducto.html"
      a.textContent = "Agregar producto"
      
      padre.appendChild(li).appendChild(a)
    } 

    document.getElementById("navbarNav").children[1].textContent = "Cerrar sesión"
  }
  
})