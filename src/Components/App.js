import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../Styles/App.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import Login from "./Login";
import Notification from "./Notification";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchRooms } from "../store/roomsAction";
import { sendData, testFetchAll } from "../store/roomsAction";
// import { StreamChat } from "stream-chat";
// import {
// 	Chat as Chatt,
// 	Channel,
// 	Window,
// 	ChannelHeader,
// 	MessageList,
// 	MessageInput,
// 	Thread,
// 	LoadingIndicator,
// } from "stream-chat-react";
// import { async } from "@firebase/util";

// const apiKey = process.env.REACT_APP_STREAM_API_KEY;

function App() {
	const { user_detail } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const { roomsList, changed, friId } = useSelector((state) => state.rooms);
	// const [client, setClient] = useState(null);
	// const [channel, setChannel] = useState(null);
	// useEffect(() => {
	// 	async function init() {
	// 		const chatClient = StreamChat.getInstance(apiKey);
	// 		await chatClient.connectUser();
	// 	}

	// 	init();
	// });
	useEffect(() => {
		if (user_detail) {
			dispatch(fetchRooms(user_detail.uid));
		}
	}, [dispatch, user_detail]);

	useEffect(() => {
		if (user_detail) {
			changed && dispatch(sendData(friId, user_detail.uid, roomsList));
		}
	}, [changed, dispatch, roomsList, user_detail]);

	return (
		<BrowserRouter>
			<div className='app'>
				{/* !user_detail */}
				{!user_detail ? (
					<Login />
				) : (
					<div className='app__body'>
						<Routes>
							<Route
								path='/rooms/:roomId'
								element={
									<>
										<Sidebar />
										<Chat />
									</>
								}
							/>
							<Route
								path='/'
								element={
									<>
										<Sidebar />
										<Chat />
									</>
								}
							/>
							<Route
								path='/notifications'
								element={
									<>
										<Notification />
									</>
								}
							/>
						</Routes>
					</div>
				)}
			</div>
		</BrowserRouter>
	);
}

export default App;
