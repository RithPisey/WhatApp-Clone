import React from "react";
import { useSelector } from "react-redux";
import "../Styles/Chats.css";

function Chats({ isSender, chat }) {
	const user = useSelector((state) => state.user.user_detail);
	const dateObj = new Date(chat.timestamp * 1000);

	return (
		<div>
			<p
				className={`chat__message ${
					chat.displayName === user.displayName && "chat__sender"
				}`}
			>
				{chat.text}
				<span className='chat__name'>
					{chat.displayName}{" "}
					<span className='chat__timeStamp'>{dateObj.toLocaleString()}</span>
				</span>
			</p>
		</div>
	);
}

export default Chats;
