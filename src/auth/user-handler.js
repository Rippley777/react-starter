import { auth } from './firebase-config';

function handleAuthStateChange() {
    auth().onAuthStateChanged(user => {
        if (user) {
            console.log("User logged in:", user);
            // Perform actions on user login
        } else {
            console.log("User not logged in");
            // Perform actions on user logout
        }
    });
}

handleAuthStateChange();
