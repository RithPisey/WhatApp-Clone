import { createSlice } from "@reduxjs/toolkit";

const roomsSlice = createSlice({
	name: "rooms",
	initialState: {
		roomsList: {},
		changed: false,
		friId: "",
	},
	reducers: {
		addMessage(state, action) {
			const chats = action.payload.chats;
			const friUid = action.payload.friUid;

			state.roomsList[friUid]["chats"].push(chats);

			state.changed = true;
		},
		replaceRoom(state, action) {
			state.roomsList = action.payload;
		},
		setFriId(state, action) {
			state.friId = action.payload;
		},
	},
});

export const roomAction = roomsSlice.actions;
export default roomsSlice;
