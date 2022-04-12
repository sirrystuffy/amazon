import './App.css';

import {initializeApp} from 'firebase/app'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import {useAuthState } from 'react-firebase-hooks/auth';

//Pages
import ProductDisplay from './components/ProductDisplay';
import Search from './pages/Search';
import Home from './pages/Home';


import { getFirestore, collection, addDoc, doc, setDoc } from "firebase/firestore"; 
import { useImperativeHandle } from 'react';
import ApiTest from './ApiTest';

import { Routes, Route, Link } from "react-router-dom";

export {app, auth} 

var firebaseConfig = {
  // Will's firestore
  apiKey: "AIzaSyDJtn7YR8Y2bttb50CZ72K3Rw5aF-hW4sg",
  authDomain: "pricefollow-cc0f3.firebaseapp.com",
  projectId: "pricefollow-cc0f3",
  storageBucket: "pricefollow-cc0f3.appspot.com",
  messagingSenderId: "650447652443",
  appId: "1:650447652443:web:5d2706685bb1c99d6be17e"

  //Gordon's firestore
  // apiKey: "AIzaSyDqXHk4u854ARKnYpBxy3Z9qV4y_3Z9CIQ",
  // authDomain: "y-project-326901.firebaseapp.com",
  // projectId: "y-project-326901",
  // storageBucket: "y-project-326901.appspot.com",
  // messagingSenderId: "613471128815",
  // appId: "1:613471128815:web:8ba988d6f87b295ea41f1a",
  // measurementId: "G-ZRHW4M9ME8"
};
//firebase.initializeApp(firebaseConfig);
//Initializing and setting up firebase
firebase.app();

// const app = initializeApp(firebaseConfig);
const app = firebase.app();

const auth = firebase.auth();

//counter's used to make sure the api is only called once
// var counter = 0;

//Main part of the web App, holds all other components
function App() {
  //Get user info from firebase
  const [user] = useAuthState(auth);
  

  // const { search } = window.location;
  // const query = new URLSearchParams(search).get('s');
  

  // if (counter == 0) {
  //   ApiTest(query, "search");
  // }
  
  // counter++;

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="items" element={user ? <ProductDisplay path={'items'} /> : <Home/>} />
        <Route path="myItems" element={user ? <ProductDisplay path={"users/" + user.uid + "/followedItems"}/>: <Home/>} />
        <Route path="search" element={<Search />} />
      </Routes>

       {/* <SignOut /> */}
        {/*
         If the user is logged in then the product display is shown, as well as an option to sign out
         If the user is not logged in then a sign in button is shown
        */}
        {/* <section>
          {user ? <Home /> : <SignIn />}
        </section>
         */}
      </div>
  )
}

function SignIn() {
  const SignInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    
    auth.signInWithPopup(provider).then(function(result) {
      
      var user = result.user.displayName;
      var email = result.user.email;
      const user_id = result.user.uid;
      
      const db = getFirestore(app);
      //add user info to 'users' collection using google id as path 
      setDoc(doc(db, "users", user_id), {
        name : user, 
        email : email, 
        uid : user_id
      }, { merge: true });

    }).catch(err => {
      console.error(err);
    });
    
  };
  
  return (
    <>
      <button className="sign-in" onClick={SignInWithGoogle}>Sign in with Google</button>
    </>
  )
  
}

// //Function is used to store data to firebase
// function Store() {
//   const [user] = useAuthState(auth);
//   //if user is signed in, store data to db 
//   const Something = () => {
//     if (user) {
//       //ApiTest(user.uid, "store");
//     }
//   }
    
//   return (
//     <>
//       <button className="store" onClick={Something}>Store api data</button>
//     </>
//   )
// }

function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
}

export default App;