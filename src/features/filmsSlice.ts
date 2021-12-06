import { createSlice } from "@reduxjs/toolkit";
import { Films } from "../api";

interface FilmsSlice {
	films: Films[];
}

const initialState: FilmsSlice = {
	films: [],
};

const filmsSlice = createSlice({
	name: "filmsSlice",
	initialState,
	reducers: {
		setFilms: (state, action) => {
			state.films = action.payload;
		},
	},
});

export const { setFilms } = filmsSlice.actions;
export default filmsSlice.reducer;
