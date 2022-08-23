import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "user",
	initialState: { user_detail: null },
	reducers: {
		addUser(state, action) {
			const user = action.payload;
			state.user_detail = user;
		},
	},
});

export const userAction = userSlice.actions;
export default userSlice;
