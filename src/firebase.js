import firebase from "firebase/compat";
import { ref, onUnmounted} from "vue";
// import 'firebase/auth';

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

const questionnairesCollection = db.collection('questionnaires')

export const createQuestionary = questionary => {
    return questionnairesCollection.add(questionary)
}

export const getQuestionary = async id => {
    const questionary = await questionnairesCollection.doc(id).get()
    return questionary.exists ? questionary.data() : null
}

export const updateQuestionary = (id, questionary) => {
    return questionnairesCollection.doc(id).update(questionary)
}

export const deleteQuestionary = id => {
    return questionnairesCollection.doc(id).delete()
}

export const useLoadQuestionnaires = () => {
    const questionnaires = ref([])
    const close = questionnairesCollection.onSnapshot(snapshot => questionnaires.value = snapshot.docs.map(doc => ({id: doc.id, ...doc.data() })))
    onUnmounted(close)
    return questionnaires
}

export const getDataFromFireBase = () => {
    return db.collection('questionnaires').orderBy('isBlocked')
        .get()
        .then(querySnapshot => {
            return querySnapshot
        })
}

// 			a.sort(function (a, b) {
// 				// console.log(Boolean(a.isBlocked), Boolean(b.isBlocked))
// 				return Boolean(b.isBlocked) - Boolean(a.isBlocked)
// 			});
