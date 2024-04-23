document.getElementById('logout-form').addEventListener('submit', function(event) {
    var confirmLogout = confirm('¿Estás seguro de que deseas cerrar sesión?');
    if (!confirmLogout) {
        event.preventDefault();
    } else {
        alert('Sesión cerrada');
    }
});

