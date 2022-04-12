import "./ModalWindow.css";
import {motion} from 'framer-motion/dist/es/index'
import ModalBackdrop from "./ModalBackdrop";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import { useCollectionData} from 'react-firebase-hooks/firestore';

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




const dropIn = {
    hidden: {
        y: "-100vh",
        opacity: 0,
    },
    visible: {
        y: "0",
        opacity: 1,

        transition: {
            duration: 0.1,
            type: "spring",
            damping: 25,
            stiffness: 500,
        }
    },
    exit: {
        y: "100vh",
        opacity: 0,
    },
};

function Modal({handleClose, item}) {
    const itemsRef = firestore.collection('items/' + item.id + '/pricehistory');
    const query = itemsRef.orderBy('price').limit(25);
  
    const [items] = useCollectionData(query, { idField: 'id' });

    return(
        <ModalBackdrop onclick={handleClose}>
            <motion.div
            onClick={(e) => e.stopPropagation}
            className="modal orange-gradient"
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            >
                <p>{item.name}</p>
                {items && items.map((itm, index) => {
                    return(
                        <div key={index}>
                            <p>${itm.price}</p>
                        </div>
                    );
                })}
                <button onClick={handleClose}>Close</button>
            </motion.div>

        </ModalBackdrop>
    );
};

export default Modal;