import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js';
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js';

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA_yoEdAvFU_zGGwhSgxMh7zytgLow-x9w",
    authDomain: "proyecto-nube-2.firebaseapp.com",
    projectId: "proyecto-nube-2",
    storageBucket: "proyecto-nube-2.appspot.com",
    messagingSenderId: "467931703400",
    appId: "1:467931703400:web:621977517d7a47fb4073dd"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Función para obtener los zapatos desde Firestore
async function fetchShoes() {
    const shoesCol = collection(db, 'Zapatos');
    const shoesSnapshot = await getDocs(shoesCol);
    const shoesList = shoesSnapshot.docs.map(doc => doc.data());
    return shoesList;
}

// Función para mostrar los zapatos en el HTML
async function displayShoes() {
    const shoes = await fetchShoes();
    const productList = document.getElementById('product-list');
    shoes.forEach(shoe => {
        const shoeItem = document.createElement('div');
        shoeItem.className = 'product-card';
        shoeItem.innerHTML = `
            <figure>
                <img src="${shoe.imagen}" alt="${shoe.nombre}" />
            </figure>
            <div class="info-product">
                <h2 class="product-title">${shoe.nombre}</h2>
                <p>Marca: ${shoe.marca}</p>
                <p class="product-price">Precio de venta: ${shoe.precioVenta}</p>
                <p class="product-price">Precio habitual: ${shoe.precioDescuento}</p>
                <button class="add-to-cart">Añadir al carrito</button>
            </div>
        `;
        productList.appendChild(shoeItem);

        // Añadir evento al botón de añadir al carrito
        const addToCartButton = shoeItem.querySelector('.add-to-cart');
        addToCartButton.addEventListener('click', () => handleAddToCart(shoe));
    });
}

// Función para manejar el evento de añadir al carrito
function handleAddToCart(shoe) {
    const currentPage = window.location.pathname;
    if (currentPage.includes('index.html')) {
        alert('Por favor, inicie sesión para poder continuar');
    } else if (currentPage.includes('Home.html')) {
        alert('Producto agregado al carrito');
    }
}

// Cargar zapatos cuando la página se haya cargado completamente
window.addEventListener('DOMContentLoaded', displayShoes);
