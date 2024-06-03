
// Array de bebida
const bebidas = [
    { id: 1, nombre: "Gin Hofman", medida: "500cc", precio: 4800, imagen: "assets/img/gin500.jpeg" },
    { id: 2, nombre: "Gin Hofman", medida: "750cc", precio: 6300, imagen: "assets/img/gin750.jpeg" },
    { id: 3, nombre: "Vermouth Perro Bissi", medida: "1 Litro", precio: 5200, imagen: "assets/img/vermouth.jpg" },
    { id: 4, nombre: "Vodka Hercion", medida: "750cc", precio: 5500, imagen: "assets/img/vodka.jpeg" },
    { id: 5, nombre: "Vodka Hercion Triple Destilled", medida: "750cc", precio: 12300, imagen: "assets/img/vodr.png" },
    { id: 6, nombre: "Whisky Central Station", medida: "750cc", precio: 10400, imagen: "assets/img/whis.jpeg" },
];

// Carrito de compras
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Función para renderizar la lista de bebidas disponibles
function renderizarBebidas() {
    const bebidasList = document.getElementById('bebidas-list');
    bebidasList.innerHTML = '';

    bebidas.forEach(bebida => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${bebida.imagen}" alt="${bebida.nombre}" class="producto-imagen">
            ${bebida.nombre} (${bebida.medida}) - $${bebida.precio} 
            <button onclick="agregarAlCarrito(${bebida.id})">Agregar</button>`;
        bebidasList.appendChild(li);
    });
}

// Función para renderizar el carrito de compras
function renderizarCarrito() {
    const carritoList = document.getElementById('carrito-list');
    carritoList.innerHTML = '';

    carrito.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${item.nombre} (${item.medida}) - $${item.precio} x${item.cantidad} <button onclick="eliminarDelCarrito(${index})">Eliminar</button>`;
        carritoList.appendChild(li);
    });

    // Mostrar u ocultar la sección del carrito
    const carritoSection = document.getElementById('carrito-section');
    if (carrito.length > 0) {
        carritoSection.style.display = 'block';
    } else {
        carritoSection.style.display = 'none';
    }
}

// Función para agregar un producto al carrito
function agregarAlCarrito(id) {
    const bebida = bebidas.find(b => b.id === id);
    const index = carrito.findIndex(item => item.id === id);
    if (index !== -1) {
        // Si el producto ya está en el carrito, aumentar la cantidad
        carrito[index].cantidad++;
    } else {
        // Si es un nuevo producto, agregarlo al carrito con cantidad 1
        bebida.cantidad = 1;
        carrito.push(bebida);
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderizarCarrito();
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(index) {
    if (carrito[index].cantidad > 1) {
        // Si hay más de una unidad del producto, disminuir la cantidad
        carrito[index].cantidad--;
    } else {
        // Si solo hay una unidad del producto, eliminarlo completamente del carrito
        carrito.splice(index, 1);
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderizarCarrito();
}

// Función para vaciar el carrito
function vaciarCarrito() {
    carrito = [];
    localStorage.removeItem('carrito');
    renderizarCarrito();
}

// Función para finalizar la compra
function finalizarCompra() {
    const modal = document.getElementById("myModal");
    const span = document.getElementsByClassName("close")[0];
    const pedidoContent = document.getElementById('pedido-content');
    const modalTotalPrice = document.getElementById('modal-total-price');

    pedidoContent.innerHTML = '';
    if (carrito.length === 0) {
        pedidoContent.innerHTML = 'No tienes productos seleccionados';
        modalTotalPrice.style.display = 'none';
    } else {
        carrito.forEach(item => {
            pedidoContent.innerHTML += `${item.nombre} (${item.medida}) x${item.cantidad}<br>`;
        });
        modalTotalPrice.innerText = `Total: $${calcularTotal()}`;
        modalTotalPrice.style.display = 'block';
    }

    modal.style.display = "block";

    span.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

// Función para calcular el total del carrito
function calcularTotal() {
    return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
}

// Eventos
document.getElementById('clear-carrito-button').addEventListener('click', vaciarCarrito);
document.getElementById('finalizar-compra-button').addEventListener('click', finalizarCompra);

// Inicialización
window.onload = function () {
    renderizarBebidas();
    renderizarCarrito();
};
