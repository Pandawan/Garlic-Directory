import firebase from 'firebase';
const config = {
	apiKey: "AIzaSyAk83Ta8t4pJUj5Pk_MO0-09avCs7E2CUo",
	authDomain: "garlic-directory.firebaseapp.com",
	databaseURL: "https://garlic-directory.firebaseio.com",
	projectId: "garlic-directory",
	storageBucket: "",
	messagingSenderId: "890259878454"
};
firebase.initializeApp(config);
export default firebase;