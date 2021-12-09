import { createSlice } from "@reduxjs/toolkit";
import {
	FilmsResultsArray,
	PeopleResultsArray,
	PlanetsResultsArray,
	SpeciesResultsArray,
	StarshipsResultsArray,
	VehiclesResultsArray,
} from "../api";

interface apiSliceProps {
	people: PeopleResultsArray[];
	films: FilmsResultsArray[];
	planets: PlanetsResultsArray[];
	species: SpeciesResultsArray[];
	vehicles: VehiclesResultsArray[];
	starships: StarshipsResultsArray[];
	category: string;
}

const initialState: apiSliceProps = {
	people: [],
	films: [],
	planets: [],
	species: [],
	vehicles: [],
	starships: [],
	category: "people",
};

const apiSlice = createSlice({
	name: "apiSlice",
	initialState,
	reducers: {
		setPeople: (state, action) => {
			state.people = action.payload;
		},
		setFilms: (state, action) => {
			state.films = action.payload;
		},
		setPlanets: (state, action) => {
			state.planets = action.payload;
		},
		setSpicies: (state, action) => {
			state.species = action.payload;
		},
		changeCategory: (state, action) => {
			state.category = action.payload;
		},
		setVehicles: (state, action) => {
			state.vehicles = action.payload;
		},
		setStarships: (state, action) => {
			state.starships = action.payload;
		},
	},
});

export const {
	setPeople,
	setFilms,
	changeCategory,
	setPlanets,
	setSpicies,
	setVehicles,
	setStarships,
} = apiSlice.actions;
export default apiSlice.reducer;
