import firebase from 'firebase/app';
import 'firebase/firestore';
import { firebaseConfig } from './config/firebase-config';
// Setup gotten from https://fireship.io/lessons/svelte-v3-overview-firebase/
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
