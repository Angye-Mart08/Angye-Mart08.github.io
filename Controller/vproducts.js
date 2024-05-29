import { viewproducts, eliminarUsuarios, actualizarUsuario } from "../Controller/firebase.js";

const ver = document.getElementById('vdata');
const searchCedula = document.getElementById('searchCedula');

async function cargar(cedula = '') {
    ver.innerHTML = '';
    const docref = await viewproducts(); 
    docref.forEach((doc) => {
        const data = doc.data(); 
        if (cedula === '' || data.cedula.includes(cedula)) {
            ver.innerHTML += `
                <tr>
                    <td>${data.nombres}</td>
                    <td>${data.apellidos}</td>
                    <td>${data.fecha}</td>
                    <td>${data.cedula}</td>
                    <td>${data.telefono}</td>
                    <td>${data.direccion}</td>
                    <td>${data.email}</td>
                    <td>${doc.id}</td>
                    <td>${data.tipoCuenta}</td>
                    <td>
                        <button type="button" class="btn btn-primary editUserBtn" data-bs-toggle="modal" data-bs-target="#editUserModal" data-id="${doc.id}" data-nombres="${data.nombres}" data-apellidos="${data.apellidos}" data-fecha="${data.fecha}" data-cedula="${data.cedula}" data-telefono="${data.telefono}" data-direccion="${data.direccion}" data-email="${data.email}" data-tipoCuenta="${data.tipoCuenta}">Editar</button>
                        <button type="button" class="btn btn-danger deleteUserBtn" data-bs-toggle="modal" data-bs-target="#deleteUserModal" data-cedula="${data.cedula}">Eliminar</button>
                    </td>
                </tr>
            `;
        }
    });

    document.querySelectorAll('.deleteUserBtn').forEach(button => {
        button.addEventListener('click', (event) => {
            const cedula = event.currentTarget.getAttribute('data-cedula');
            document.getElementById('cedulaToDelete').value = cedula;
        });
    });

    document.querySelectorAll('.editUserBtn').forEach(button => {
        button.addEventListener('click', (event) => {
            const id = event.currentTarget.getAttribute('data-id');
            const nombres = event.currentTarget.getAttribute('data-nombres');
            const apellidos = event.currentTarget.getAttribute('data-apellidos');
            const fecha = event.currentTarget.getAttribute('data-fecha');
            const cedula = event.currentTarget.getAttribute('data-cedula');
            const telefono = event.currentTarget.getAttribute('data-telefono');
            const direccion = event.currentTarget.getAttribute('data-direccion');
            const email = event.currentTarget.getAttribute('data-email');
            const tipoCuenta = event.currentTarget.getAttribute('data-tipoCuenta');

            document.getElementById('editId').value = id;
            document.getElementById('editNombres').value = nombres;
            document.getElementById('editApellidos').value = apellidos;
            document.getElementById('editFecha').value = fecha;
            document.getElementById('editCedula').value = cedula;
            document.getElementById('editTelefono').value = telefono;
            document.getElementById('editDireccion').value = direccion;
            document.getElementById('editEmail').value = email;
            document.getElementById('editTipoCuenta').value = tipoCuenta;
        });
    });
}

document.getElementById('updateUserForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const id = document.getElementById('editId').value;
    const nombres = document.getElementById('editNombres').value;
    const apellidos = document.getElementById('editApellidos').value;
    const fecha = document.getElementById('editFecha').value;
    const cedula = document.getElementById('editCedula').value;
    const telefono = document.getElementById('editTelefono').value;
    const direccion = document.getElementById('editDireccion').value;
    const email = document.getElementById('editEmail').value;
    const tipoCuenta = document.getElementById('editTipoCuenta').value;

    try {
        await actualizarUsuario(id, nombres, apellidos, fecha, cedula, telefono, direccion, email, tipoCuenta);
        alert('Usuario actualizado correctamente');
        $('#editUserModal').modal('hide');
        cargar();
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        alert('Hubo un error al actualizar el usuario. Por favor, inténtelo de nuevo.');
    }
});

searchCedula.addEventListener('input', (event) => {
    const searchTerm = event.target.value;
    cargar(searchTerm);
});

cargar();
