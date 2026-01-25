// URL base del API
const API_URL = 'http://localhost:8080/productos';

// Variables globales
let modoEdicion = false;
let productoId = null;

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    // Verificar si estamos en modo edición
    const urlParams = new URLSearchParams(window.location.search);
    productoId = urlParams.get('id');

    if (productoId) {
        modoEdicion = true;
        cargarProducto(productoId);
        actualizarUIParaEdicion();
    }

    // Event listener para el formulario
    document.getElementById('Formulario').addEventListener('submit', manejarSubmit);
});

// Actualizar UI para modo edición
function actualizarUIParaEdicion() {
    // Cambiar título
    document.querySelector('.header-card h1').textContent = 'Editar Producto';
    document.querySelector('.header-card p').textContent = 'Actualiza la información del producto';

    // Mostrar botón volver
    document.getElementById('btnVolver').classList.remove('d-none');

    // Cambiar texto del botón submit
    const btnSubmit = document.getElementById('btnFormulario');
    btnSubmit.innerHTML = '<i class="bi bi-check-circle me-2"></i>Actualizar Producto';

    // Cambiar texto de la sección derecha
    const headerTexto = document.querySelector('.position-absolute h3');
    const headerParrafo = document.querySelector('.position-absolute p');
    if (headerTexto) headerTexto.textContent = 'Actualiza tu Producto';
    if (headerParrafo) headerParrafo.textContent = 'Mantén la información actualizada para ofrecer la mejor experiencia a tus clientes.';

    // Hacer que la imagen no sea requerida
    const inputImagen = document.getElementById('imagen');
    inputImagen.removeAttribute('required');
    
    // Actualizar texto de ayuda de la imagen
    const imagenHelp = inputImagen.nextElementSibling;
    if (imagenHelp && imagenHelp.classList.contains('form-text')) {
        imagenHelp.textContent = 'Formatos aceptados: JPG, PNG, WEBP (Máx. 3MB) - Dejar vacío para mantener la imagen actual';
    }

    // Agregar botón de cancelar si no existe
    const btnEnviar = document.querySelector('.btn-enviar');
    if (!document.getElementById('btnCancelar')) {
        const btnCancelar = document.createElement('a');
        btnCancelar.href = './gestionProductos.html';
        btnCancelar.className = 'btn btn-secondary btn-lg px-4';
        btnCancelar.id = 'btnCancelar';
        btnCancelar.innerHTML = '<i class="bi bi-x-circle me-2"></i>Cancelar';
        btnEnviar.appendChild(btnCancelar);
    }
}

// Cargar datos del producto para edición
async function cargarProducto(id) {
    try {
        Swal.fire({
            title: 'Cargando...',
            text: 'Obteniendo datos del producto',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const response = await fetch(`${API_URL}/${id}`);
        
        if (!response.ok) {
            throw new Error('Producto no encontrado');
        }

        const producto = await response.json();
        Swal.close();
        console.log(producto)
        llenarFormulario(producto);

    } catch (error) {
        console.error('Error:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo cargar el producto',
            confirmButtonColor: '#7ad03a'
        }).then(() => {
            window.location.href = './gestionProductos.html';
        });
    }
}

// Llenar formulario con datos del producto
function llenarFormulario(producto) {
    document.getElementById('titulo').value = producto.nombre;
    document.getElementById('descripcion').value = producto.descripcion || '';
    document.getElementById('fechaVencimiento').value = producto.fechaVencimiento;
    document.getElementById('categoria').value = producto.categoria?.idCategoria || '';
    document.getElementById('precio').value = producto.precioUnitario;
    document.getElementById('unidadDePeso').value = producto.unidadDePeso;
    document.getElementById('cantidadDisponible').value = producto.stock;

    // Mostrar imagen actual si existe
    if (producto.imagen) {
        mostrarImagenActual(producto.imagen);
    }
}

// Mostrar imagen actual en modo edición
function mostrarImagenActual(urlImagen) {
    const contenedor = document.getElementById('imagenPreviewContainer');
    
    // Limpiar contenedor
    contenedor.innerHTML = '';
    
    // Crear elemento de vista previa
    const preview = document.createElement('div');
    preview.id = 'imagenPreview';
    preview.innerHTML = `
        <p class="small text-muted mb-2 fw-semibold">
            <i class="bi bi-image me-1"></i>Imagen actual:
        </p>
        <img src="${urlImagen}" alt="Imagen actual" class="img-thumbnail" />
    `;
    
    contenedor.appendChild(preview);
}

// Manejar submit del formulario (crear o editar)
async function manejarSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    // Recoger datos del formulario
    formData.append('nombre', document.getElementById('titulo').value);
    formData.append('descripcion', document.getElementById('descripcion').value);
    formData.append('fechaVencimiento', document.getElementById('fechaVencimiento').value);
    formData.append('precioUnitario', document.getElementById('precio').value);
    formData.append('unidadDePeso', document.getElementById('unidadDePeso').value);
    formData.append('stock', document.getElementById('cantidadDisponible').value);
    formData.append('idCategoria', document.getElementById('categoria').value);

    // Manejar imagen
    const imagenInput = document.getElementById('imagen');
    
    if (modoEdicion) {
        // En modo edición, solo agregar imagen si se seleccionó una nueva
        if (imagenInput.files.length > 0) {
            const imagen = imagenInput.files[0];
            
            if (!validarImagen(imagen)) {
                return;
            }
            
            formData.append('imagen', imagen);
        }
    } else {
        // En modo creación, la imagen es requerida
        if (imagenInput.files.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Debes seleccionar una imagen del producto',
                confirmButtonColor: '#7ad03a'
            });
            return;
        }

        const imagen = imagenInput.files[0];
        
        if (!validarImagen(imagen)) {
            return;
        }
        
        formData.append('imagen', imagen);
    }

    // Llamar a la función correspondiente
    if (modoEdicion) {
        await actualizarProducto(formData);
    } else {
        await crearProducto(formData);
    }
}

// Validar imagen
function validarImagen(imagen) {
    // Validar tipo
    if (!imagen.type.startsWith('image/')) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El archivo debe ser una imagen (JPG, PNG o WEBP)',
            confirmButtonColor: '#7ad03a'
        });
        return false;
    }

    // Validar tamaño (3MB)
    if (imagen.size > 3 * 1024 * 1024) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'La imagen no debe superar los 3MB',
            confirmButtonColor: '#7ad03a'
        });
        return false;
    }

    return true;
}

// Crear producto
async function crearProducto(formData) {
    try {
        Swal.fire({
            title: 'Creando producto...',
            text: 'Por favor espera',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const response = await fetch(API_URL, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(errorData || 'Error al crear el producto');
        }

        await Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'El producto se ha creado correctamente',
            confirmButtonColor: '#7ad03a',
            timer: 2000
        });

        // Limpiar formulario
        document.getElementById('Formulario').reset();

        // Opcional: redirigir a gestión de productos
        // window.location.href = './gestionProductos.html';

    } catch (error) {
        console.error('Error:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message || 'No se pudo crear el producto',
            confirmButtonColor: '#7ad03a'
        });
    }
}

// Actualizar producto
async function actualizarProducto(formData) {
    try {
        Swal.fire({
            title: 'Actualizando producto...',
            text: 'Por favor espera',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const response = await fetch(`${API_URL}/editar/${productoId}`, {
            method: 'PUT',
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(errorData || 'Error al actualizar el producto');
        }

        await Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'El producto se ha actualizado correctamente',
            confirmButtonColor: '#7ad03a',
            timer: 2000
        });

        // Redirigir a gestión de productos
        window.location.href = './gestionProductos.html';

    } catch (error) {
        console.error('Error:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message || 'No se pudo actualizar el producto',
            confirmButtonColor: '#7ad03a'
        });
    }
}