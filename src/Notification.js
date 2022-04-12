import { getFirestore, collection, getDoc, doc } from "firebase/firestore";
import { app, auth } from './App';
import axios from 'axios'

// open -n -a "Google Chrome" --args --user-data-dir=/tmp/temp_chrome_user_data_dir http://localhost:3000/ --disable-web-security

//Email the user  
function Notify(userPath) {
    const db = getFirestore(app);
    const userRef = doc(db, "users", userPath);
    const userSnap = getDoc(userRef);
    userSnap.then(userData => {
        //API only allows 50 free calls a month, ~45 left
        const options = {
            method: 'POST',
            url: 'https://email-sender1.p.rapidapi.com/',
            params: {
                txt_msg: 'Hello, ' + userData.get('name') + ', one of your followed products has lowered its price below your price point !',
                to: userData.get('email'),
                from: 'No-Reply-Product-Tracker-Notifications',
                subject: 'Hurry! Your Product is Waiting !',
                bcc: 'bcc-mail@gmail.com',
                reply_to: 'reply-to@gmail.com',
                //html_msg: '<html><body><b>test of the body</b></body></html>',
                cc: 'cc-mail@gmail.com'
            },
            headers: {
                'content-type': 'application/json',
                'x-rapidapi-host': 'email-sender1.p.rapidapi.com',
                'x-rapidapi-key': 'f2698fb092msh83ba85fe72e3079p1f0c2fjsne9c3258d5ea4'
            },
            data: { key1: '1', key2: '2' } //I don't know what this does
        };

        // axios.request(options).then(function (response) {
        //     console.log(response.data);
        // }).catch(function (error) {
        //     console.error(error);
        // });

    });


}
export default Notify;