// URL base del API
const API_URL = 'http://localhost:8080/productos';

// Variable global para almacenar todos los productos
let todosLosProductos = [];

// Cargar productos al iniciar la página
document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
    inicializarEventListeners();
});

// Inicializar event listeners para búsqueda y filtros
function inicializarEventListeners() {
    const buscarInput = document.getElementById('buscarProducto');
    const filtroCategoria = document.getElementById('filtroCategoria');
    const btnLimpiar = document.getElementById('btnLimpiarFiltros');

    // Búsqueda en tiempo real
    buscarInput.addEventListener('input', aplicarFiltros);

    // Filtro por categoría
    filtroCategoria.addEventListener('change', aplicarFiltros);

    // Limpiar filtros
    btnLimpiar.addEventListener('click', limpiarFiltros);
}

// Función para cargar todos los productos
async function cargarProductos() {
    try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error('Error al cargar los productos');
        }

        todosLosProductos = await response.json();
        mostrarProductos(todosLosProductos);
        actualizarContador(todosLosProductos.length, todosLosProductos.length);
        
    } catch (error) {
        console.error('Error:', error);
        mostrarError('No se pudieron cargar los productos. Por favor, intenta de nuevo.');
    }
}

// Función para aplicar filtros
function aplicarFiltros() {
    const textoBusqueda = document.getElementById('buscarProducto').value.toLowerCase().trim();
    const categoriaSeleccionada = document.getElementById('filtroCategoria').value;

    let productosFiltrados = todosLosProductos;

    // Filtrar por nombre
    if (textoBusqueda) {
        productosFiltrados = productosFiltrados.filter(producto => 
            producto.nombre.toLowerCase().includes(textoBusqueda) ||
            (producto.descripcion && producto.descripcion.toLowerCase().includes(textoBusqueda))
        );
    }

    // Filtrar por categoría
    if (categoriaSeleccionada) {
        productosFiltrados = productosFiltrados.filter(producto => 
            producto.categoria && producto.categoria.idCategoria == categoriaSeleccionada
        );
    }

    mostrarProductos(productosFiltrados);
    actualizarContador(productosFiltrados.length, todosLosProductos.length);
}

// Función para limpiar filtros
function limpiarFiltros() {
    document.getElementById('buscarProducto').value = '';
    document.getElementById('filtroCategoria').value = '';
    mostrarProductos(todosLosProductos);
    actualizarContador(todosLosProductos.length, todosLosProductos.length);
}

// Función para actualizar contador de resultados
function actualizarContador(mostrados, total) {
    const contador = document.getElementById('contadorResultados');
    
    if (mostrados === total) {
        contador.innerHTML = `<i class="bi bi-info-circle me-1"></i>Mostrando <strong>${total}</strong> producto(s)`;
    } else {
        contador.innerHTML = `<i class="bi bi-funnel-fill me-1"></i>Mostrando <strong>${mostrados}</strong> de <strong>${total}</strong> producto(s)`;
    }
}

// Función para mostrar productos en la tabla
function mostrarProductos(productos) {
    const tbody = document.getElementById('tablaProductos');
    
    if (productos.length === 0) {
        const hayFiltros = document.getElementById('buscarProducto').value || 
                          document.getElementById('filtroCategoria').value;
        
        if (hayFiltros) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="7" class="text-center py-5">
                        <i class="bi bi-search fs-1 text-muted"></i>
                        <p class="mt-3 text-muted">No se encontraron productos con los filtros aplicados</p>
                        <button class="btn btn-outline-success mt-2" onclick="limpiarFiltros()">
                            <i class="bi bi-x-circle me-2"></i>Limpiar Filtros
                        </button>
                    </td>
                </tr>
            `;
        } else {
            tbody.innerHTML = `
                <tr>
                    <td colspan="7" class="text-center py-5">
                        <i class="bi bi-inbox fs-1 text-muted"></i>
                        <p class="mt-3 text-muted">No hay productos registrados</p>
                        <a href="./agregarProducto.html" class="btn btn-success mt-2">
                            <i class="bi bi-plus-circle me-2"></i>Agregar Primer Producto
                        </a>
                    </td>
                </tr>
            `;
        }
        return;
    }

    tbody.innerHTML = productos.map(producto => `
        <tr>
            <td class="px-4 py-3">
                <img src="${producto.imagen || '/assets/images/default-product.jpg'}" 
                     alt="${producto.nombre}" 
                     class="rounded" 
                     style="width: 60px; height: 60px; object-fit: cover;"
                     onerror="this.src='/assets/images/default-product.jpg'">
            </td>
            <td class="py-3">
                <div class="fw-semibold">${producto.nombre}</div>
                <small class="text-muted">${producto.descripcion ? producto.descripcion.substring(0, 50) + '...' : 'Sin descripción'}</small>
            </td>
            <td class="py-3">
                <span class="badge" style="background-color: #7ad03a;">
                    ${producto.categoria ? producto.categoria.nombre : 'Sin categoría'}
                </span>
            </td>
            <td class="py-3">
                <strong>$${formatearPrecio(producto.precioUnitario)}</strong>
                <br>
                <small class="text-muted">${producto.unidadDePeso}</small>
            </td>
            <td class="py-3">
                <span class="badge ${producto.stock > 50 ? 'bg-success' : producto.stock > 20 ? 'bg-warning' : 'bg-danger'}">
                    ${producto.stock} unidades
                </span>
            </td>
            <td class="py-3">
                <small>${formatearFecha(producto.fechaVencimiento)}</small>
            </td>
            <td class="text-center py-3">
                <div class="btn-group" role="group">
                    <button class="btn btn-sm btn-outline-primary" 
                            onclick="editarProducto(${producto.idProducto})"
                            title="Editar producto">
                        <i class="bi bi-pencil-fill"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" 
                            onclick="confirmarEliminar(${producto.idProducto}, '${producto.nombre}')"
                            title="Eliminar producto">
                        <i class="bi bi-trash-fill"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Función para formatear precio
function formatearPrecio(precio) {
    return new Intl.NumberFormat('es-CO', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(precio);
}

// Función para formatear fecha
function formatearFecha(fecha) {
    if (!fecha) return 'N/A';
    const opciones = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(fecha).toLocaleDateString('es-ES', opciones);
}

// Función para editar producto
function editarProducto(id) {
    // Redirigir a la página de agregar productos con el ID para editar
    window.location.href = `./agregarEditarProducto.html?id=${id}`;
}

// Función para confirmar eliminación
async function confirmarEliminar(id, nombre) {
    const result = await Swal.fire({
        title: '¿Estás seguro?',
        html: `¿Deseas eliminar el producto <strong>${nombre}</strong>?<br>Esta acción no se puede deshacer.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
    });

    if (result.isConfirmed) {
        await eliminarProducto(id);
    }
}

// Función para eliminar producto
async function eliminarProducto(id) {
    try {
        // Mostrar loading
        Swal.fire({
            title: 'Eliminando...',
            text: 'Por favor espera',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Error al eliminar el producto');
        }

        // Mostrar éxito
        await Swal.fire({
            icon: 'success',
            title: '¡Eliminado!',
            text: 'El producto ha sido eliminado correctamente',
            timer: 2000,
            showConfirmButton: false
        });

        // Recargar la tabla
        cargarProductos();

    } catch (error) {
        console.error('Error:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo eliminar el producto. Por favor, intenta de nuevo.',
            confirmButtonColor: '#7ad03a'
        });
    }
}

// Función para mostrar errores
function mostrarError(mensaje) {
    const tbody = document.getElementById('tablaProductos');
    tbody.innerHTML = `
        <tr>
            <td colspan="7" class="text-center py-5">
                <i class="bi bi-exclamation-triangle fs-1 text-danger"></i>
                <p class="mt-3 text-danger">${mensaje}</p>
                <button class="btn btn-success mt-2" onclick="cargarProductos()">
                    <i class="bi bi-arrow-clockwise me-2"></i>Reintentar
                </button>
            </td>
        </tr>
    `;
}