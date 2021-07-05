import rebase from 're-base'
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'


const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBepEQdbBqSrzc3t4Z6UE3fsM8GgCG_uSQ",
    authDomain: "hot-burgers-cc889.firebaseapp.com",
    databaseURL: "https://hot-burgers-cc889-default-rtdb.firebaseio.com"
})

const base = rebase.createClass(firebaseApp.database())

export { firebaseApp }

export default base