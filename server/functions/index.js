const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const util = require('util');
const stringSimilarity = require('string-similarity');

const debugMode = true;

// Setup express
const app = express();
// Allow Cross Origin requests
app.use(cors({
	origin: true
}));

// Initialize Firebase Admin
admin.initializeApp(functions.config().firebase);

function debugLog(msg) {
	if (debugMode) {
		console.log(msg);
	}
}

// Searches through a database for the corresponding users with that name
// This is a very hacky way, but it works so leave me alone
app.get('/:search', (req, res) => {
	debugLog('Got request for ' + req.params.search);
	return admin.firestore().collection('names').get().then((querySnapshot) => {
		let userIds = [];
		// Loop through every document in the names collection
		querySnapshot.docs.forEach((doc) => {
			debugLog('Found a doc ' + util.inspect(doc.id));
			// Id must be at least 60% similar to the search term
			if (stringSimilarity.compareTwoStrings(req.params.search, doc.id) > 0.60) {
				let docData = doc.data();
				debugLog('Doc name is valid! ' + util.inspect(docData));
				// Loop through every key (and use docData[key] for its value) in that object
				Object.keys(docData).forEach((key) => {
					debugLog('Checking pair ' + docData + ', ' + docData[key]);
					// If that value is true (name corresponds to that id)
					if (docData[key]) {
						debugLog('Found valid key/value pair ' + docData + ', ' + docData[key]);
						userIds.push(key);
					}
				});
			}
		});

		if (userIds.length > 0) {
			// Wait for all requests to finish before responding
			return Promise.all(userIds.map((id) => {
				// Send a request to get that user's data
				return admin.firestore().collection('users').doc(id).get();
			})).then((values) => {
				// Create an array of users' data based on the snapshots returned from the requests
				let dataArray = values.map(snapshot => {
					if (snapshot.exists) {
						return snapshot.data();
					} else {
						return null;
					}
				});
				// Return the data
				return res.send({
					data: dataArray
				});
			}).catch(err => res.send({
				error: err
			}));
		} else {
			return res.send({
				data: null
			});
		}
	}).catch(err => res.send({
		error: err
	}));
});

exports.searchAPI = functions.https.onRequest(app);