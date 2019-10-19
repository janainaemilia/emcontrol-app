import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyBwNIfpYdls1w2BWrKmAaOnWILVl3KVn5o",
    authDomain: "emcontrol-tcc.firebaseapp.com",
    databaseURL: "https://emcontrol-tcc.firebaseio.com",
    projectId: "emcontrol-tcc",
    storageBucket: "",
    messagingSenderId: "819835170247",
    appId: "1:819835170247:web:a73d191d62b115ce"
}

firebase.initializeApp(config)
firebase.firestore().settings({ timestampsInSnapshots: true})

export default firebase;