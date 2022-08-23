import React from "react";
import "../Styles/Sidebar.css";
import { Avatar } from "@mui/material";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SidebarChat from "./SidebarChat";
import { useSelector } from "react-redux";
import { uid } from "uid";

function Sidebar() {
	const rooms = useSelector((state) => state.rooms.roomsList);
	const { user_detail } = useSelector((state) => state.user);

	return (
		<div className='sidebar'>
			<div className='sidebar__header'>
				<Avatar
					referrerPolicy='no-referrer'
					src={user_detail && user_detail.photoURL}
				/>
				<div className='sidebar__headerRight'>
					<IconButton>
						<DonutLargeIcon />
					</IconButton>
					<IconButton>
						<ChatIcon />
					</IconButton>
					<IconButton>
						<MoreVertIcon />
					</IconButton>
				</div>
			</div>
			<div className='sidebar__search'>
				<div className='sidebar__search--container'>
					<SearchOutlinedIcon />
					<input type='text' placeholder='Search or start new chat' />
				</div>
			</div>
			<div className='sidebar__chats'>
				<SidebarChat addNewChat />
				{Object.entries(rooms).map(([key, value]) => {
					return (
						<SidebarChat
							key={uid()}
							id={key}
							name={value.displayName}
							photoURL={value.photoURL}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default Sidebar;
