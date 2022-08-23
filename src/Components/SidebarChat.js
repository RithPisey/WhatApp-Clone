import React, { useEffect, useState } from "react";
import "../Styles/SidebarChat.css";
import { Avatar } from "@mui/material";
import { uid } from "uid";
import { useDispatch, useSelector } from "react-redux";
import { roomAction } from "../store/roomSlice";
import { Link } from "react-router-dom";
import { addChat } from "../store/roomsAction";

function SidebarChat({ id, name, addNewChat, photoURL }) {
	const sender = useSelector((state) => state.user.user_detail);
	const [seed, setSeed] = useState("");
	const dispatch = useDispatch();
	useEffect(() => {
		setSeed(Math.floor(Math.random() * 5000));
	}, []);

	function createChat(e) {
		const email = prompt("Please enter someone's email:");
		if (email) {
			dispatch(addChat(sender.uid, email, sender));
		}
	}

	return !addNewChat ? (
		<Link to={`/rooms/${id}&${name}`} style={{ textDecoration: "none" }}>
			<div className='sidebarChat'>
				<Avatar src={photoURL} />
				<div
					onClick={(e) => dispatch(roomAction.setFriId(id))}
					className='sidebarChat__info'
				>
					<h2>{name}</h2>
					<p>Last message...</p>
				</div>
			</div>
		</Link>
	) : (
		<div onClick={createChat} className='sidebarChat'>
			<h3>Add new Chat</h3>
		</div>
	);
}

export default SidebarChat;
