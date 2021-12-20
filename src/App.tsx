import { ThemeProvider } from "@emotion/react";
import { Box, createTheme, SxProps, Theme } from "@mui/material";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { Route, Routes } from "react-router";
import { Dispatch } from "redux";
import { getAllItems } from "./api";
import FilmDetails from "./Components/Films/FilmsDetails";
import Header from "./Components/Header";
import Home from "./Components/Home";
import PersonDetails from "./Components/People/PersonDetails";
import PlanetDetails from "./Components/Planets/PlanetDetails";
import SpecieDetails from "./Components/Species/SpecieDetails";
import StarshipDetails from "./Components/Starships/StarshipDetails";
import VehicleDetails from "./Components/Vehicles/VehicleDetails";

const theme = createTheme({
	palette: {
		mode: "dark",
	},
});

const classes: SxProps<Theme> | any = {
	app: {
		width: "100%",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		gap: "15px",
	},
	buttonGroup: {
		display: "flex",
		"flex-wrap": "wrap",
	},
};

export const getNeedData = async (
	stateArray: any[],
	dataName: string,
	dispatch: Dispatch,
	setState: ActionCreatorWithPayload<any>
) => {
	if (!stateArray.length) {
		(async () => {
			const response = getAllItems(dataName);
			dispatch(setState(await response));
		})();
	}
};

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Box sx={classes.app}>
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/character/:personName" element={<PersonDetails />} />
					<Route path="/movie/:movieTitle" element={<FilmDetails />} />
					<Route path="/planet/:planetName" element={<PlanetDetails />} />
					<Route path="/specie/:specieName" element={<SpecieDetails />} />
					<Route path="/starship/:starshipName" element={<StarshipDetails />} />
					<Route path="/vehicle/:vehicleName" element={<VehicleDetails />} />
				</Routes>
			</Box>
		</ThemeProvider>
	);
}

export default App;
