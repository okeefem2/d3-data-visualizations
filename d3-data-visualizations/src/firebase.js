import firebase from 'firebase/app';
import 'firebase/firestore';

// Setup gotten from https://fireship.io/lessons/svelte-v3-overview-firebase/
const firebaseConfig = {
    apiKey: "AIzaSyCS1DMT9ZnywgrV2Mlr4PbkIPMEtuwtuPQ",
    authDomain: "d3-data-visualization-demo.firebaseapp.com",
    databaseURL: "https://d3-data-visualization-demo.firebaseio.com",
    projectId: "d3-data-visualization-demo",
    storageBucket: "d3-data-visualization-demo.appspot.com",
    messagingSenderId: "672950516237",
    appId: "1:672950516237:web:3983c29bfd849f1b"
  };

firebase.initializeApp(firebaseConfig);


export const db = firebase.firestore();