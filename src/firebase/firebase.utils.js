import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCuNlWZxSdYxyfQuDnzzFakDuoKORcYKY0",
  authDomain: "ghost-clothing-20c6c.firebaseapp.com",
  projectId: "ghost-clothing-20c6c",
  storageBucket: "ghost-clothing-20c6c.appspot.com",
  messagingSenderId: "842175508347",
  appId: "1:842175508347:web:c4841e6db321bb998257de",
  measurementId: "G-ZR80NKMLDJ",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`user/${userAuth.uid}`);
  const snapShot = await userRef.get()
   
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData 
      })
    } catch (error) {
      console.log('Error creating  user', error.message)
    }
 }
  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
