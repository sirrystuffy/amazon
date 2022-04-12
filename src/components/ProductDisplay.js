import './ProductDisplay.css';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import { useCollectionData} from 'react-firebase-hooks/firestore';

// import ItemToCard from './ItemToCard';

import { Card, CardMedia, CardContent, Typography} from '@material-ui/core'
import {Button, CardActionArea, CardActions} from '@material-ui/core'

import {useState} from 'react';
import { AnimatePresence } from "framer-motion";

import ModalWindow from './ModalWindow';

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



//Takes in a path to where to find the data in the database
function ProductDisplay({path}) {

  const itemsRef = firestore.collection(path);
  const query = itemsRef.orderBy('name');
  const [items] = useCollectionData(query, { idField: 'id' });

  const[modalOpen, setModalOpen] = useState(false);
  const[clickedItem, setClickedItem] = useState(0);
  
  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);

  return (<>
    <div className="product-display">
      {items && items.map(itm => {
        return(
          <div className="item-container">
            <Card>
            <CardActionArea onClick={() => (modalOpen ? close() : open(), setClickedItem(itm))}>
              <CardMedia
                component="img"
                height="150px"
                image= {itm.imagelink}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {itm.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {itm.description}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button href={itm.amazonlink} size="small" color="success">
                Buy
              </Button>
              <Button size="small" color="primary">
                Follow
              </Button>
            </CardActions>
          </Card>

        <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
        >
          {modalOpen && clickedItem && <ModalWindow item={clickedItem} modalOpen={modalOpen} handleClose={close} />}
        </AnimatePresence>

        </div>
        )
      })
    }
    </div>
  </>)

}
export default ProductDisplay;