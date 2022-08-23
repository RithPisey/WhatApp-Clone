import { configureStore } from "@reduxjs/toolkit";
import roomsSlice from "./roomSlice";
import userSlice from "./userSlice";

const store = configureStore({
	reducer: {
		rooms: roomsSlice.reducer,
		user: userSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [" user/addUser"],
				ignoredActionPaths: ["payload"],
				ignoredPaths: ["user.user_detail"],
			},
		}),
});

export default store;
