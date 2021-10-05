const firebaseConfig = {
	apiKey: 'AIzaSyCp1s9A0OghuHrZ9nE2CDyEisA5Wx3c1G0',
	authDomain: 'hydraliteio.firebaseapp.com',
	projectId: 'hydraliteio',
	storageBucket: 'hydraliteio.appspot.com',
	messagingSenderId: '461061257841',
	appId: '1:461061257841:web:91348cd76181ae9ab7f9d0',
	measurementId: 'G-N4QBP0HYVV'
};
import firebase from 'firebase/app/dist/index.cjs.js';
import 'firebase/firestore/dist/index.cjs.js';

export default class FirestoreManager {
	initialize() {
		if (!firebase.apps.length) {
			firebase.initializeApp(firebaseConfig);
		} else {
			firebase.app(); // if already initialized, use that one
		}
	}

	validateEmail(email: string) {
		return new Promise(async (res, _) => {
			this.initialize();

			const collectionRef = firebase.firestore().collection('waitlist');

			await collectionRef
				.where('email', '==', email)
				.get()
				.then((querySnapshot) => {
					querySnapshot.forEach((doc) => {
						if (doc) {
							console.log('ASDASDASD');

							res('Duplicate Waitlist Identified');
						}
					});
				})
				.catch((error) => {
					console.log('Error getting documents: ', error);
				});

			const re =
				/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

			if (re.test(String(email).toLowerCase())) {
				res('Success');
			} else {
				res('Invalid Email Address');
			}
		});
	}

	setEmail(email: string) {
		this.initialize();
		firebase
			.firestore()
			.collection('waitlist')
			.doc(email)
			.set({
				email
			})
			.then(() => {
				console.log('Document successfully written!');
			})
			.catch((error) => {
				console.error('Error writing document: ', error);
			});
	}
}
