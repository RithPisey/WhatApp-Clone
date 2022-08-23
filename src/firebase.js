// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
const firebaseConfig = {
	apiKey: "AIzaSyA1Gx8ZLfq1lWKOSzCS02gK6ZnlXZitGnA",
	authDomain: "whatapp-clone-hrp.firebaseapp.com",
	projectId: "whatapp-clone-hrp",
	storageBucket: "whatapp-clone-hrp.appspot.com",
	messagingSenderId: "441466357897",
	appId: "1:441466357897:web:e92b41cda947b184779e58",
	measurementId: "G-H4LW70S5LY",
	databaseURL: "https://whatapp-clone-hrp-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider };
// Add the public key generated from the console here.

//AIzaSyB7Dmmo2PTDniJ7TxT9gqYiUrM9XTAbAK8

//BOdtuB0gzAS1Jgl1MdamvF9MbaWXtegFUUpZcfmCZU9iRcVm7OAe0XZEzaZMnLAn9_aPwzChM7SDv_Wzi4SQq3g
