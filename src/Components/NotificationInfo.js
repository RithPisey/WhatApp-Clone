import React from "react";
import { Avatar } from "@mui/material";
import { Button } from "@mui/material";
import "../Styles/NotificationInfo.css";
function NotificationInfo({ imgURL }) {
	function onAccept() {}
	function onDeny() {}
	return (
		<div className='notificationInfo__container'>
			<Avatar src={imgURL} />
			<p>Display Name</p>
			<div className='notificationInfo__Button'>
				<Button onClick={onDeny}>Deny</Button>
				<Button onClick={onAccept}>Accept</Button>
			</div>
		</div>
	);
}

export default NotificationInfo;
