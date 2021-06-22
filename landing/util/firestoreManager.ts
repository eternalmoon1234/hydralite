import firebase from "firebase";
import "firebase/firestore";

import { firebaseConfig } from "./firestoreConfig";

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

            var collectionRef = firebase.firestore().collection("waitlist");

            await collectionRef
                .where("email", "==", email)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        if (doc) {
                            console.log("ASDASDASD");

                            res("Duplicate Waitlist Identified");
                        }
                    });
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });

            const re =
                /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

            if (re.test(String(email).toLowerCase())) {
                res("Success");
            } else {
                res("Invalid Email Address");
            }
        });
    }

    setEmail(email: string) {
        this.initialize();
        firebase
            .firestore()
            .collection("waitlist")
            .doc(email)
            .set({
                email: email,
            })
            .then(() => {
                console.log("Document successfully written!");
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
    }
}
