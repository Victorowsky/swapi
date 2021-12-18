import { AlertColor } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";

interface stateProps {
	type: AlertColor | undefined;
	message: string;
	isOpen: boolean;
}

const initialState: stateProps = {
	type: "success",
	message: "Example alert message",
	isOpen: false,
};

const alertSlice = createSlice({
	name: "alert",
	initialState,
	reducers: {
		setAlert: (state, action) => {
			const { type, message } = action.payload;
			state.isOpen = true;
			state.type = type;
			state.message = message;
		},
		hideAlert: (state) => {
			state.isOpen = false;
		},
	},
});

export const { setAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;
