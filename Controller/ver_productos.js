import { viewShoes, eliminarProducto, actualizarProducto } from "./firebase.js";

const ver = document.getElementById('vdata');
const searchCodigo = document.getElementById('searchCodigo');

async function cargar(codigo = '') {
    ver.innerHTML = '';
    const docref = await viewShoes();
    docref.forEach((doc) => {
        const data = doc.data();
        if (codigo === '' || data.codigoProducto.includes(codigo)) {
            ver.innerHTML += `
                <tr>
                    <td>${data.codigoProducto}</td>
                    <td>${data.nombre}</td>
                    <td>${data.marca}</td>
                    <td>${data.precioVenta}</td>
                    <td>${data.precioDescuento}</td>
                    <td><img src="${data.imagen}" alt="${data.nombre}" style="width: 50px; height: 50px;"></td>
                    <td>
                        <button type="button" class="btn btn-danger deleteProductBtn" data-bs-toggle="modal" data-bs-target="#deleteProductModal" data-codigo="${data.codigoProducto}">Eliminar</button>
                        <button type="button" class="btn btn-primary editProductBtn" data-bs-toggle="modal" data-bs-target="#editProductModal" data-codigo="${data.codigoProducto}" data-nombre="${data.nombre}" data-marca="${data.marca}" data-precioVenta="${data.precioVenta}" data-precioDescuento="${data.precioDescuento}" data-imagen="${data.imagen}">Editar</button>
                    </td>
                </tr>
            `;
        }
    });

    document.querySelectorAll('.deleteProductBtn').forEach(button => {
        button.addEventListener('click', (event) => {
            const codigo = event.currentTarget.getAttribute('data-codigo');
            document.getElementById('codigoToDelete').value = codigo;
        });
    });

    document.querySelectorAll('.editProductBtn').forEach(button => {
        button.addEventListener('click', (event) => {
            const button = event.currentTarget;
            document.getElementById('codigoToUpdate').value = button.getAttribute('data-codigo');
            document.getElementById('updNombre').value = button.getAttribute('data-nombre');
            document.getElementById('updMarca').value = button.getAttribute('data-marca');
            document.getElementById('updPrecioVenta').value = button.getAttribute('data-precioVenta');
            document.getElementById('updPrecioDescuento').value = button.getAttribute('data-precioDescuento');
            document.getElementById('updImagen').value = button.getAttribute('data-imagen');
        });
    });
}

searchCodigo.addEventListener('input', () => {
    cargar(searchCodigo.value);
});

window.addEventListener('DOMContentLoaded', async () => {
    await cargar(); 
});

document.getElementById('deleteProductForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const codigo = document.getElementById('codigoToDelete').value;

    try {
        await eliminarProducto(codigo);
        alert('Producto eliminado correctamente');
        location.reload();
    } catch (error) {
        alert('Error al eliminar el producto:', error);
    }
});

document.getElementById('updateProductForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const codigo = document.getElementById('codigoToUpdate').value;
    const nombre = document.getElementById('updNombre').value;
    const marca = document.getElementById('updMarca').value;
    const precioVenta = document.getElementById('updPrecioVenta').value;
    const precioDescuento = document.getElementById('updPrecioDescuento').value;
    const imagen = document.getElementById('updImagen').value;

    try {
        await actualizarProducto(codigo, nombre, marca, precioVenta, precioDescuento, imagen);
        alert('Producto actualizado correctamente');
        location.reload();
    } catch (error) {
        alert('Error al actualizar el producto:', error);
    }
});
