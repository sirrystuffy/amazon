import React from "react";
import { app, auth } from './App';
import 'firebase/compat/firestore';
import firebase from 'firebase/compat/app';

import { getFirestore, collection, getDoc, doc, setDoc } from "firebase/firestore";

function ApiTest(value, option) {
    if (option == "search") {
        fetch(`https://amazon-price1.p.rapidapi.com/search?keywords=${value}&marketplace=US`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "amazon-price1.p.rapidapi.com",
                "x-rapidapi-key": "f2698fb092msh83ba85fe72e3079p1f0c2fjsne9c3258d5ea4"
            }
        }
        )
            .then(response => response.json())
            .then(data => {
                const db = getFirestore(app);
                //add asin to searches -- will overwrite value with most recent search ! 
                setDoc(doc(db, "searches", "asins"), {
                    value
                });

                //After searching, we want to display a product page with corresponding information
                //Do here . . . 

            })
            .catch(err => {
                console.error(err);
            });
    } else if (option == "store") {
        //get most recent asin search from db 
        const db = getFirestore(app);
        const docRef = doc(db, "searches", "asins");
        const docSnap = getDoc(docRef);
        
        docSnap.then(data => {
            var asin = data.get('value');
            fetch(`https://amazon-price1.p.rapidapi.com/search?keywords=${asin}&marketplace=US`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "amazon-price1.p.rapidapi.com",
                    "x-rapidapi-key": "f2698fb092msh83ba85fe72e3079p1f0c2fjsne9c3258d5ea4"
                }
            })
                .then(response => response.json())
                .then(apiData => {
                    var reference = firebase.firestore(app);
                    var time = new Date().toLocaleTimeString();
                    
                    //store asin to users/userid
                    const userRef = reference.collection('users').doc(value).collection('asins');
                    userRef.doc(asin).set({
                        price : apiData[0]['price']
                    });

                    // to get document id : const document = userRef.doc(asin).id;

                    //store product data to products collection 
                    const productRef = reference.collection('products').doc(asin);
                    productRef.set({
                        asin : apiData[0]['ASIN'],
                        title : apiData[0]['title'], 
                        image : apiData[0]['imageUrl']

                    });
                    //price sub collection includes price and timestamp of response 
                    productRef.collection('price').doc('data').set({
                        price : apiData[0]['price'], 
                        timestamp : time
                    });

                })
                .catch(err => {
                    console.error(err);
                });

        });

    }

    ApiTest = function () { };
    return (

        <div className="App">
            <h1>Hello World!</h1>
        </div>
    );
}

export default ApiTest;