import { Box, Paper, Skeleton, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import {
	FilmsResultsArray,
	PeopleResultsArray,
	PlanetsResultsArray,
} from "../../api";
import { getNeedData } from "../../App";
import { RootState } from "../../app/store";
import { setFilms, setPeople, setPlanets } from "../../features/apiSlice";
import { detailsClasses } from "../sharedClasses";

interface PlanetDetailsProps {}

const PlanetDetails: React.FC<PlanetDetailsProps> = () => {
	const { planets, films, people } = useSelector(
		(state: RootState) => state.api
	);

	const { planetName } = useParams();

	const dispatch = useDispatch();

	useEffect(() => {
		getNeedData(films, "films", dispatch, setFilms);
		getNeedData(people, "people", dispatch, setPeople);
		getNeedData(planets, "planets", dispatch, setPlanets);
	}, [dispatch, films, people, planets]);

	if (!planets.length || !people.length || !films.length) {
		return (
			<Skeleton
				variant="rectangular"
				animation="wave"
				sx={detailsClasses.skeleton}
			/>
		);
	}

	const currentPlanet = planets.find(
		(planet: PlanetsResultsArray) => planet.name === planetName
	);

	if (!currentPlanet) {
		return <Box>Planet doesn't exist</Box>;
	}

	const findFilms = films?.filter((film: FilmsResultsArray) =>
		currentPlanet.films.includes(film.url)
	);
	const findResidents = people?.filter((people: PeopleResultsArray) =>
		currentPlanet.residents.includes(people.url)
	);

	const renderFilms = findFilms.map((film: FilmsResultsArray) => {
		const { title } = film;
		return (
			<Link key={title} style={detailsClasses.link} to={`/movie/${title}`}>
				<Typography sx={detailsClasses.typographyLink}> - {title} </Typography>
			</Link>
		);
	});

	const renderResidents = findResidents.map((resident: PeopleResultsArray) => {
		const { name } = resident;
		return (
			<Link key={name} style={detailsClasses.link} to={`/character/${name}`}>
				<Typography sx={detailsClasses.typographyLink}> - {name} </Typography>
			</Link>
		);
	});

	const {
		name,
		population,
		climate,
		diameter,
		rotation_period,
		orbital_period,
		terrain,
		surface_water,
	} = currentPlanet;

	return (
		<Box sx={detailsClasses.box}>
			<Paper sx={detailsClasses.paper}>
				<Typography variant="h4" align="center">
					Information
				</Typography>
				<Typography>Planet name: {name}</Typography>
				<Typography>Population: {population}</Typography>
				<Typography>Climate: {climate}</Typography>
				<Typography>Diameter: {diameter}m</Typography>
				<Typography>Rotation period: {rotation_period} days</Typography>
				<Typography>Orbital period: {orbital_period} days</Typography>
				<Typography>Terrain: {terrain}</Typography>
				<Typography>Water surface: {surface_water}</Typography>
			</Paper>
			{Boolean(currentPlanet.films.length) && (
				<Paper sx={detailsClasses.paper}>
					<Typography variant="h4" align="center">
						Movies
					</Typography>
					{renderFilms}
				</Paper>
			)}
			{Boolean(currentPlanet.residents.length) && (
				<Paper sx={detailsClasses.paper}>
					<Typography variant="h4" align="center">
						Residents
					</Typography>
					{renderResidents}
				</Paper>
			)}
		</Box>
	);
};

export default PlanetDetails;
