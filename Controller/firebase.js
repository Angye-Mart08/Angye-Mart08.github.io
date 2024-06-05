import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js';
import { 
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  deleteUser as authDeleteUser,
  sendEmailVerification,
  sendPasswordResetEmail
} from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js';
import { 
  getFirestore,
  collection, 
  addDoc,
  getDocs,
  getDoc,
  setDoc,
  doc,
  deleteDoc,
  updateDoc,
  query,
  where
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbsbKkAnFMOollAOJfUfKtrM9nqD7s_mA",
  authDomain: "web24-6ec39.firebaseapp.com",
  databaseURL: "https://web24-6ec39-default-rtdb.firebaseio.com",
  projectId: "web24-6ec39",
  storageBucket: "web24-6ec39.appspot.com",
  messagingSenderId: "368004971300",
  appId: "1:368004971300:web:69027eaa774fbb826811b1",
  measurementId: "G-WYPYST3V7Q"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export const registerauth = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export const verification = () =>
  sendEmailVerification(auth.currentUser);

export const loginauth = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const googleauth = (provider) =>
  signInWithPopup(auth, provider);

export const facebookauth = (provider) =>
  signInWithPopup(auth, provider);

export function userstate(){
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log(uid);
    } else {
      window.location.href='../index.html';
    }
  });
}

export const recoverypass = (email) =>
  sendPasswordResetEmail(auth, email);

export const loginout = () =>
  signOut(auth);

export async function EliminarUsuario() {
  console.log('Función EliminarUsuario llamada');
  const user = auth.currentUser;
  try {
    await authDeleteUser(user);
    console.log('Usuario eliminado de la autenticación');
  } catch (error) {
    console.error('Error al eliminar el usuario de la autenticación', error);
    throw error;
  }
  
  try {
    const userSnapshot = await getDocs(query(collection(db, "Usuarios"), where("email", "==", user.email)));
    if (!userSnapshot.empty) {
      const userDoc = userSnapshot.docs[0];
      await deleteDoc(doc(db, 'Usuarios', userDoc.id));
      console.log('Usuario eliminado de Firestore');
    }
  } catch (error) {
    console.error('Error al eliminar el usuario de Firestore', error);
    throw error;
  }
}

export const setregister = (nombres, apellidos, fecha, cedula, estado, rh, genero, telefono, direccion, email, tipoCuenta) => 
  setDoc(doc(db, "Usuarios", cedula), {  
    nombres, 
    apellidos, 
    fecha, 
    cedula, 
    estado, 
    rh, 
    genero, 
    telefono, 
    direccion, 
    email, 
    tipoCuenta
  });

export const Getregister = (cedula) => 
  getDoc(doc(db, "Usuarios", cedula));

export const addregister = (nombres, apellidos, fecha, cedula, estado, rh, genero, telefono, direccion, email, tipoCuenta) =>
  addDoc(collection(db, "Usuarios"), {
    nombres,
    apellidos,
    fecha,
    cedula,
    estado,
    rh,
    genero,
    telefono,
    direccion,
    email,
    tipoCuenta
  });

export const viewproducts = () =>
  getDocs(collection(db, "Usuarios"));

export async function eliminarUsuarios(docId) {
  if (window.confirm('¿Estás seguro de que quieres eliminar este usuario? Esta acción es irreversible.')) {
    try {
      await deleteDoc(doc(db, 'Usuarios', docId));
      console.log('Usuario eliminado de Firestore');
    } catch (error) {
      console.error('Error al eliminar el usuario de Firestore:', error);
      throw error;
    }
  }
}

export const logout = () =>
  signOut(auth);

export const deleteuser = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    const user = auth.currentUser;
    if (user) {
      await authDeleteUser(user);
      const userRef = doc(db, "Usuarios", user.uid);
      await deleteDoc(userRef);
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function actualizarUsuario(cedula, data) {
  try {
    const userRef = doc(db, "Usuarios", cedula); 
    await updateDoc(userRef, data);
    console.log('Usuario actualizado correctamente');
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    throw error;
  }
}

// Funciones para zapatos
export async function registrarZapato(codigoProducto, nombre, marca, precioVenta, precioDescuento, imagen) {
  try {
    const docRef = await addDoc(collection(db, 'Zapatos'), {
      codigoProducto,
      nombre,
      marca,
      precioVenta,
      precioDescuento,
      imagen
    });
    console.log('Zapato registrado con ID: ', docRef.id);
    alert('Zapato registrado exitosamente.');
  } catch (e) {
    console.error('Error al agregar el documento: ', e);
    alert('Error al registrar el zapato.');
  }
}

export const Getregister2 = (codigoProducto) => 
  getDoc(doc(db, "Zapatos", codigoProducto));

export const setregister2 = (codigoProducto, nombre, marca, precioVenta, precioDescuento, imagen) => 
  setDoc(doc(db, "Zapatos", codigoProducto), {  
    codigoProducto,
    nombre,
    marca,
    precioVenta,
    precioDescuento,
    imagen
  });

export const viewShoes = async () => {
  const shoesCollection = collection(db, "Zapatos");
  const shoesSnapshot = await getDocs(shoesCollection);
  return shoesSnapshot;
};

export const eliminarProducto = async (codigo) => {
  const shoesCollection = collection(db, "Zapatos");
  const q = query(shoesCollection, where("codigoProducto", "==", codigo));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(async (document) => {
    await deleteDoc(doc(db, "Zapatos", document.id));
  });
};

export const actualizarProducto = async (codigo, nombre, marca, precioVenta, precioDescuento, imagen) => {
  const shoesCollection = collection(db, "Zapatos");
  const q = query(shoesCollection, where("codigoProducto", "==", codigo));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(async (document) => {
    const docRef = doc(db, "Zapatos", document.id);
    await updateDoc(docRef, {
      nombre,
      marca,
      precioVenta,
      precioDescuento,
      imagen
    });
  });
};
