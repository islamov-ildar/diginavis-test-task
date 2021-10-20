import firebase from "firebase/compat";
import { ref, onUnmounted} from "vue";

const config = {
    apiKey: "AIzaSyBvTtN_GtOu5qWkv1ThA-szpj90HRqARKI",
    authDomain: "test-task-19102021.firebaseapp.com",
    projectId: "test-task-19102021",
    storageBucket: "test-task-19102021.appspot.com",
    messagingSenderId: "1065445308619",
    appId: "1:1065445308619:web:f2cd64d09e6b1b59d8c34e",
    measurementId: "G-BKCCQKCFM0"
};

const fireBaseApp = firebase.initializeApp(config)

const db = fireBaseApp.firestore()
const usersCollection = db.collection('users')

export const createUser = user => {
    return usersCollection.add(user)
}

export const getUser = async id => {
    const user = await usersCollection.doc(id).get()
    return user.exists ? user.data() : null
}

export const updateUser = (id, user) => {
    return usersCollection.doc(id).update(user)
}

export const deleteUser = id => {
    return usersCollection.doc(id).delete
}

export const useLoadUsers = () => {
    const users = ref([])
    const close = usersCollection.onSnapshot(snapshot => users.value = snapshot.docs.map(doc => ({id: doc.id, ...doc.data() })))
    onUnmounted(close)
    return users
}

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries
//
// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyBvTtN_GtOu5qWkv1ThA-szpj90HRqARKI",
//     authDomain: "test-task-19102021.firebaseapp.com",
//     projectId: "test-task-19102021",
//     storageBucket: "test-task-19102021.appspot.com",
//     messagingSenderId: "1065445308619",
//     appId: "1:1065445308619:web:f2cd64d09e6b1b59d8c34e",
//     measurementId: "G-BKCCQKCFM0"
// };
//
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
