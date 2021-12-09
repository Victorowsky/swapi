import { ThemeProvider } from "@emotion/react";
import { Box, createTheme } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router";
import {
	getAllFilms,
	getAllPeople,
	getAllPlanets,
	getAllSpecies,
	getAllStarships,
	getAllVehicles,
} from "./api";
import FilmDetails from "./Components/Films/FilmsDetails";
import Header from "./Components/Header";
import Home from "./Components/Home";
import PersonDetails from "./Components/People/PersonDetails";
import PlanetDetails from "./Components/Planets/PlanetDetails";
import SpecieDetails from "./Components/Species/SpecieDetails";
import StarshipDetails from "./Components/Starships/StarshipDetails";
import VehicleDetails from "./Components/Vehicles/VehicleDetails";
import {
	setPeople,
	setPlanets,
	setSpicies,
	setStarships,
	setVehicles,
} from "./features/apiSlice";
import { setFilms } from "./features/apiSlice";

const theme = createTheme({
	palette: {
		mode: "dark",
	},
});

const classes = {
	app: {
		width: "100%",
		display: "flex",
		"flex-direction": "column",
		alignItems: "center",
		gap: "15px",
	},
	buttonGroup: {
		display: "flex",
		"flex-wrap": "wrap",
	},
};

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			const people = getAllPeople();
			const planets = getAllPlanets();
			const species = getAllSpecies();
			const films = getAllFilms();
			const vehicles = getAllVehicles();
			const starships = getAllStarships();
			dispatch(setPeople(await people));
			dispatch(setPlanets(await planets));
			dispatch(setSpicies(await species));
			dispatch(setFilms(await films));
			dispatch(setVehicles(await vehicles));
			dispatch(setStarships(await starships));
		})();
	}, [dispatch]);

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
