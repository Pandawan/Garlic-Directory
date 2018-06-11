import firebase from 'firebase';
import 'firebase/firestore';

const config = {
	apiKey: "AIzaSyAk83Ta8t4pJUj5Pk_MO0-09avCs7E2CUo",
	authDomain: "garlic-directory.firebaseapp.com",
	databaseURL: "https://garlic-directory.firebaseio.com",
	projectId: "garlic-directory",
	storageBucket: "",
	messagingSenderId: "890259878454"
};
firebase.initializeApp(config);
const firestore = firebase.firestore();
const settings = {
	timestampsInSnapshots: true
};
firestore.settings(settings);


export default firebase;
export { firestore };