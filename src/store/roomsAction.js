import { roomAction } from "./roomSlice";
import { db } from "../firebase";
import { useState } from "react";
import {
	ref,
	onValue,
	set,
	update,
	query,
	limitToLast,
	startAt,
	equalTo,
	get,
	push,
} from "firebase/database";
import { useSelector } from "react-redux";

export function fetchRooms(uid) {
	return (dispatch) => {
		const que = query(ref(db, "messages"));

		get(que).then((snapshot) => {
			snapshot.forEach((u) => {
				if (u.key === uid) {
					dispatch(roomAction.replaceRoom(u.val().friends));
				}
			});
		});
	};
}

export function sendData(friId, sender, rooms) {
	return (dispatch) => {
		console.log("###############");
		console.log("friId >>>>> ", friId);
		//send data to friend
		const que = query(
			ref(db, "messages/" + friId + "/friends/" + sender + "/chats")
		);
		get(que).then((snapshot) => {
			console.log(snapshot.val());
			console.log(sender);
		});
		console.log("rooms >>>>", rooms);
		Object.entries(rooms).map((room) => {
			if (room[0] === friId) {
				console.log("chat >>>>> ", room[1].chats);
				update(ref(db, "messages/" + sender + "/friends/" + friId), {
					chats: room[1].chats,
				});
				update(ref(db, "messages/" + friId + "/friends/" + sender), {
					chats: room[1].chats,
				});
			}
		});
		// update(
		// 	ref(db, "messages/" + friId + "/friends/" + sender + "/chats"),
		// 	"newChat"
		// );
		// update(
		// 	ref(db, "messages/" + sender + "/friends/" + friId + "/chats"),
		// 	"newChat"
		// );

		//set(ref(db, "messages" + uid + "/rooms"), rooms);
	};
}

export function createUser(user, mss, uid) {
	return (dispatch) => {
		const [isHad, setHad] = useState(false);
		get(query(ref(db, "messages"))).then((ss) => {
			ss.forEach((id) => {
				if (id.key === uid) {
					setHad(true);
				}
			});
		});
		console.log("isHad >>>> ", isHad);
		if (!isHad) {
			update(ref(db, "messages"), mss);
		}
		update(ref(db, "users"), user);
	};
}

export function addChat(senderUID, email, sender) {
	return (dispatch) => {
		const que = query(ref(db, "messages"));
		var isHad = false;
		get(que).then((snapshot) => {
			snapshot.forEach((fri) => {
				if (fri.val().email === email) {
					console.log("fri name >>>> ", fri.val().displayName);
					const chatObj = {
						displayName: fri.val().displayName,
						photoURL: fri.val().photoURL,
					};
					isHad = true;
					updateMessage(fri, senderUID, chatObj, sender);
				}
			});
			if (!isHad) {
				alert("Cannot find friend!");
			}
		});
	};
}
function updateMessage(fri, senderUID, chatObj, sender) {
	console.log("fri key >>>> ", fri.key);
	console.log("Sender key >>>> ", senderUID);
	const friObj = {},
		senderObj = {};

	friObj[senderUID] = {
		displayName: sender.displayName,
		photoURL: sender.photoURL,
		chats: [""],
	};
	senderObj[fri.key] = {
		displayName: chatObj.displayName,
		photoURL: chatObj.photoURL,
		chats: [""],
	};

	update(ref(db, `messages/${fri.key}/friends`), friObj); //{ friends: senderUID }
	update(ref(db, `messages/${senderUID}/friends`), senderObj); //{ friends: fri.key }
	alert("added new messsage!");
}
export function testFetchAll() {
	return (dispatch) => {
		const roomRef = ref(db, "users/");
		//
		// onValue(roomRef, (snapshot) => {
		// 	if (snapshot.val()) {
		// 		console.log(snapshot.val());
		// 		const queryString = Object.entries(snapshot.val()).map(
		// 			([key, value]) => {
		// 				return `${key}=${value}`;
		// 			}
		// 		);
		// 		console.log(queryString[0]);
		// 	}
		// });
		const que = query(ref(db, "users"));

		get(que).then((snapshot) => {
			snapshot.forEach((u) => {
				if (u.val().email === "hengrithpisey@gmail.com")
					console.log("this is u.key .>>>> ", u.key);
			});
			console.log(snapshot.val());
		});
	};
}
