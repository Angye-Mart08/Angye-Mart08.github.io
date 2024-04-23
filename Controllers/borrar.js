import { deleteuser, loginauth, auth } from './firebase.js';

const deleteUserForm = document.getElementById('Delete-Form');

deleteUserForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('edtemail').value;
    const password = document.getElementById('edtpassword').value;

    try {

        await loginauth(email, password);

        await deleteuser(auth.currentUser);
        
        alert('Usuario'+email+' eliminado exitosamente.');
        window.location.href = "/index.html"; 

    } catch (error) {

        console.error('Error al eliminar usuario:' + email, error.message);
        alert('Error al eliminar usuario: ' + error.message);

    }
});