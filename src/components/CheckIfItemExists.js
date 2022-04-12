//This function checks if the item exists in the collection holding all items.

import React from 'react'

import React from 'react'

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

var firebaseConfig = {
    apiKey: "AIzaSyDJtn7YR8Y2bttb50CZ72K3Rw5aF-hW4sg",
    authDomain: "pricefollow-cc0f3.firebaseapp.com",
    projectId: "pricefollow-cc0f3",
    storageBucket: "pricefollow-cc0f3.appspot.com",
    messagingSenderId: "650447652443",
    appId: "1:650447652443:web:5d2706685bb1c99d6be17e"
  };
  
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

export default function CheckIfItemExists({asin}) {

    //Gets all of the items from the database.
    const itemsRef = firestore.collection(path);
    const query = itemsRef.orderBy('name');
    const [items] = useCollectionData(query, { idField: 'id' });

    //Check if the asin of any of the items in the database is the same as the asin passed in.
    for(var i = 0; i < items.length; i++) {
        if(items[i].asin === asin) {
            return items[i];
        }
    }
    return false;
}
