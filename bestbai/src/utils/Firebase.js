import firebase from 'firebase/app';
import 'firebase/auth';
import { FirebaseConfig } from '../properties/FirebaseConfig';
firebase.initializeApp(FirebaseConfig);


export const fireBaseSignIn = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(function(error) { 
      var errorCode = error.code;
      var errorMessage = error.message; 
      console.log(errorCode + errorMessage);
    });
};

export const firebaseSignOut = () => {
  return firebase.auth().signOut().then(function() {
    // Sign-out successful.
    console.log('signed out');
  }).catch(function(error) {
    // An error happened.
  });
};

export const fireBaseCreateUser = (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
};