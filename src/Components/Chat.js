import MoreVert from "@mui/icons-material/MoreVert";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import AttacthFile from "@mui/icons-material/AttachFileTwoTone";
import InsertEmoticon from "@mui/icons-material/InsertEmoticon";
import Send from "@mui/icons-material/Send";
import { Avatar, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import "../Styles/Chat.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Chats from "./Chats";
import { uid } from "uid";

import moment from "moment";

import { roomAction } from "../store/roomSlice";

function Chat() {
	const [input, setInput] = useState("");
	const [roomName, setRoomName] = useState("");
	const [photoURL, setPhotoURL] = useState("");
	const [messages, setMessage] = useState([]);
	const { roomId } = useParams();
	const rooms = useSelector((state) => state.rooms.roomsList);
	const sender = useSelector((state) => state.user.user_detail);
	const dispatch = useDispatch();
	useEffect(() => {
		if (roomId) {
			const [id, name] = roomId.split("&");

			Object.entries(rooms).map(([key, value]) => {
				if (key === id) {
					setPhotoURL(value.photoURL);
					// console.log("this is my chats with fri >>>>> ", value.chats);
					setMessage(value.chats);
				}
			});

			setRoomName(name);
		}
	}, [roomId, rooms]);

	function sendMessage(e) {
		const senderText = input;
		const friId = roomId.split("&", 1);
		const payload = {
			chats: {
				displayName: sender.displayName,
				text: senderText,
				timestamp: moment().unix(),
			},
			friUid: friId,
		};
		dispatch(roomAction.addMessage(payload));
		// dispatch(sendData(friId[0], sender.uid, rooms));
		setInput("");
		e.preventDefault();
	}

	return (
		<div className='chat'>
			<div className='chat__header'>
				{roomName && (
					<>
						<Avatar src={photoURL} />
						<div className='chat__headerInfo'>
							<h3>{roomName}</h3>
							<p>Last seen at ...</p>
						</div>
						<div className='chat__headerRight'>
							<IconButton>
								<SearchOutlined />
							</IconButton>
							<IconButton>
								<AttacthFile />
							</IconButton>
							<IconButton>
								<MoreVert />
							</IconButton>
						</div>
					</>
				)}
			</div>
			<div className='chat__body'>
				{messages &&
					messages.map((chat) => {
						if (chat.displayName)
							return <Chats key={uid()} chat={chat} isSender={true} />;
					})}
			</div>
			<div className='chat__footer'>
				<InsertEmoticon />
				<form action=''>
					<input
						onChange={(e) => setInput(e.target.value)}
						value={input}
						placeholder='Type a message'
						name=''
						id=''
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								e.preventDefault();
								sendMessage(e);
							}
						}}
					/>

					<IconButton onClick={sendMessage}>
						<Send />
					</IconButton>
				</form>
			</div>
		</div>
	);
}

export default Chat;
