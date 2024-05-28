import {addregister} from './firebase.js'

const boton = document.getElementById('rgsbtn')
const salir = document.getElementById('exitbtn')

async function Agregar(){

    const nombre = document.getElementById('edtnom').value;
    const apellido = document.getElementById('edtape').value;
    const fecha = document.getElementById('edtfecha').value;
    const cedula = document.getElementById('edtcc').value;
   
    const telefono = document.getElementById('edttlf').value;
    const direccion = document.getElementById('edtdirec').value;
    const email = document.getElementById('edtemail').value;

    const cuenta = document.getElementById('cuentapi').value;

    const verificar = addregister(nombre, apellido, fecha, cedula, telefono, direccion, email,cuenta)
    const validar = await verificar

    .then((validar) => {
        
        alert('Usuario ' + nombre + ' con el email '+ email +' fue guardado exitosamente')

    })
    .catch((error) => {

        alert('Error al agregar el usuario')

        const errorCode = error.code;
        const errorMesagge = error.mesagge

    })

}

window.addEventListener('DOMContentLoaded', async()=>{
    boton.addEventListener('click', Agregar)
})

salir.addEventListener('click', function() {
    window.location.href = "/index.html";
})