import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCbsbKkAnFMOollAOJfUfKtrM9nqD7s_mA",
  authDomain: "web24-6ec39.firebaseapp.com",
  projectId: "web24-6ec39",
  storageBucket: "web24-6ec39.appspot.com",
  messagingSenderId: "368004971300",
  appId: "1:368004971300:web:69027eaa774fbb826811b1",
  measurementId: "G-WYPYST3V7Q"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

export class ManageAccount {
  register(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((_) => {
        window.location.href = "/index.html";
        alert("Registro exitoso");
      })
      .catch((error) => {
        console.error(error.message);
            // Mostrar alerta de error de registro
            alert("Error al registrar");
      });
  }

  authenticate(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((_) => {
        window.location.href = "/Templates/home.html";
        // Mostrar alerta de inicio de sesión exitoso
        alert("Has iniciado sesión correctamente.");
      })
      .catch((error) => {
        console.error(error.message);
                // Mostrar alerta de error de inicio de sesión
                alert("Error al iniciar sesión");
      });
  }

  signOut() {
    signOut(auth)
      .then((_) => {
        window.location.href = "/Templates/home.html";
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}
