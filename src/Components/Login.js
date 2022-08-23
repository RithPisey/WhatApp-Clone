import React from "react";
import "../Styles/Login.css";
import Button from "@mui/material/Button";
import { auth, provider } from "../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useDispatch } from "react-redux";
import { userAction } from "../store/userSlice";
import { createUser } from "../store/roomsAction";
function Login() {
	const dispatch = useDispatch();
	function signIn() {
		signInWithPopup(auth, provider)
			.then((result) => {
				// This gives you a Google Access Token. You can use it to access the Google API.
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const token = credential.accessToken;
				// The signed-in user info.
				const user = result.user;
				dispatch(userAction.addUser(user));
				const dbUser = {};
				dbUser[user.uid] = {
					email: user.email,
					photoURL: user.photoURL,
					displayName: user.displayName,
				};

				const mss = {};
				mss[user.uid] = {
					email: user.email,
					photoURL: user.photoURL,
					displayName: user.displayName,
				};
				dispatch(createUser(dbUser, mss, user.uid));

				// ...
			})
			.catch((error) => {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				// The email of the user's account used.
				const email = error.customData.email;
				// The AuthCredential type that was used.
				const credential = GoogleAuthProvider.credentialFromError(error);
				// ...
			});
	}
	return (
		<div className='login'>
			<div className='login__container'>
				<img
					src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/800px-WhatsApp.svg.png'
					alt=''
				/>
				<div className='login_text'>
					<h1>Sign in to WhatsApp</h1>
				</div>
				<Button onClick={signIn}>Sign in to WhatsApp</Button>
			</div>
		</div>
	);
}

export default Login;
