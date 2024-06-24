import 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import {
	signInWithEmailAndPassword,
	getAuth,
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
} from 'firebase/auth';
import firebase from 'firebase/compat/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyCeAXEuaOTI6G5G9uaBRVHaKSHSPkZtqsw',
	authDomain: 'college-web-c2230.firebaseapp.com',
	databaseURL: 'https://college-web-c2230-default-rtdb.firebaseio.com',
	projectId: 'college-web-c2230',
	storageBucket: 'college-web-c2230.appspot.com',
	messagingSenderId: '640136420617',
	appId: '1:640136420617:web:bfd96a0aaf7149fa1ec7d8',
	measurementId: 'G-XF7Y7P1SF9',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore();
export const auth = getAuth();

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;

	return await signInWithEmailAndPassword(auth, email, password);
};
export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;

	return await createUserWithEmailAndPassword(auth, email, password);
};
export const onAuthStateChangedListener = (callback) =>
	onAuthStateChanged(auth, callback);
export const signOutUser = async () => await signOut(auth);
