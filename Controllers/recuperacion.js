import {recoverypass} from './firebase.js'

const recover = document.getElementById('resbtn')

async function reset(){

    const email = document.getElementById('email').value

    const validar = recoverypass(email)
    const verificar = await validar

    .then((verificar) => {
        
        alert('Reset password verification succefull' + email)
        window.location.href="/Templates/home.html"

    })
    .catch((error) => {

        alert('Not Succefull')
        const errorCode = error.code;
        const errorMesagge = error.mesagge

    })

}

window.addEventListener('DOMContentLoaded', async()=>{
    recover.addEventListener('click', reset)
})