// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { deleteDoc, doc, getFirestore, setDoc } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDTP-FRFh5OpGEMexEKauhh3nwnCcCXF3w",
    authDomain: "my-app-fe58a.firebaseapp.com",
    projectId: "my-app-fe58a",
    storageBucket: "my-app-fe58a.appspot.com",
    messagingSenderId: "1098730626922",
    appId: "1:1098730626922:web:9900e8abb7f49ba1970f13"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

//Read all documents in the collection for favourite movies
export async function readAllFB() {
    const arr = []
    const querySnapshot = await getDocs(collection(db, "movies"))
    querySnapshot.forEach((doc) => {
        arr.push({ ...doc.data() })
    })
    return arr
}
//Remove a favourite movie from the collection
export async function removeFB(id) {
    await deleteDoc(doc(db, "movies", id.toString()))
}
//Add a favourite movie to the collection
export async function writeFB(movie) {
    await setDoc(doc(db, "movies", movie.id.toString()), {
        id: movie.id,
        backdrop_path: movie.backdrop_path,
        title: movie.title,
        release_date: movie.release_date,
        vote_average: movie.vote_average
    })
}
//Empty the favourite movies collection
export function removeAllFB() {
    readAllFB().then((movies) => movies.map((m) => { removeFB(m.id) }))
}