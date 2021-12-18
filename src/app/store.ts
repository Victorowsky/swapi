import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import alertSlice from "../features/alertSlice";
import apiSlice from "../features/apiSlice";

export const store = configureStore({
	reducer: {
		api: apiSlice,
		alert: alertSlice,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
