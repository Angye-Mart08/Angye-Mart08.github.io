import { registrarZapato , registerauth, verification, setregister2 } from './firebase.js';

const formulario = document.getElementById('Product-Form');
const boton = document.getElementById('registerBtn');

async function registerProduct() {
    const codigoProducto = formulario['codigoProducto'].value;
    const nombre = formulario['nombre'].value;
    const marca = formulario['marca'].value;
    const precioVenta = formulario['precioVenta'].value;
    const precioDescuento = formulario['precioDescuento'].value;
    const imagen = formulario['imagen'].value;

    if (!codigoProducto || !nombre || !marca || !precioVenta || !precioDescuento || !imagen) {
        alert('Por favor completa todos los campos.');
        return;
    }

    try {
        await setregister2(codigoProducto, nombre, marca, precioVenta, precioDescuento, imagen);
        alert('Zapato registrado exitosamente con código: ' + codigoProducto);
        window.location.href = "/index.html";
    } catch (error) {
        console.error('Error al registrar el zapato: ', error);
        alert('Error al registrar el zapato.');
    }
}

boton.addEventListener('click', (e) => {
    e.preventDefault();
    registerProduct();
});
