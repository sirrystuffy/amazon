//This function will take in a json object representing an item, and add it to the database under "users/userid/items"

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

import { doc, setDoc } from "firebase/firestore"; 

export default function AddItemToItems({item, user_id}) {

    //add user info to 'users' collection using google id as path 
    setDoc(doc(db, "items"), {
        name : item.name,
        imagelink : item.imagelink,
        amazonlink : item.amazonlink,
        description : item.description,
        asin : item.asin
      }, { merge: true });
  

    return (
        <>
        console.log("item added to items");
        </>
    )
}
