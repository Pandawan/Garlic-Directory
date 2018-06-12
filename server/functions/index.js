const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const algoliasearch = require('algoliasearch');
const algolia = algoliasearch(functions.config().algolia.appid, functions.config().algolia.adminkey);

exports.onUserCreated = functions.firestore.document('users/{userId}').onCreate((snap, context) => {
	// Get the user document
	const user = snap.data();

	// Add an 'objectID' field which Algolia requires
	user.objectID = context.params.userId;
  
	// Write to the algolia index
	const index = algolia.initIndex('users');
	return index.saveObject(user);
})