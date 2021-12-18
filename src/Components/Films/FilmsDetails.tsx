import { Box, Paper, Skeleton, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import {
	FilmsResultsArray,
	getAllItems,
	PeopleResultsArray,
	PlanetsResultsArray,
	SpeciesResultsArray,
	StarshipsResultsArray,
	VehiclesResultsArray,
} from "../../api";
import { RootState } from "../../app/store";
import {
	setFilms,
	setPeople,
	setPlanets,
	setSpecies,
	setStarships,
	setVehicles,
} from "../../features/apiSlice";
import { detailsClasses } from "../sharedClasses";

interface FilmDetailsProps {}

const FilmDetails: React.FC<FilmDetailsProps> = () => {
	const { movieTitle } = useParams();

	const { films, people, planets, species, starships, vehicles } = useSelector(
		(state: RootState) => state.api
	);

	const dispatch = useDispatch();

	useEffect(() => {
		if (!vehicles.length) {
			(async () => {
				const response = getAllItems("vehicles");
				dispatch(setVehicles(await response));
			})();
		}
		if (!species.length) {
			(async () => {
				const response = getAllItems("species");
				dispatch(setSpecies(await response));
			})();
		}
		if (!films.length) {
			(async () => {
				const response = getAllItems("films");
				dispatch(setFilms(await response));
			})();
		}
		if (!people.length) {
			(async () => {
				const response = getAllItems("people");
				dispatch(setPeople(await response));
			})();
		}
		if (!planets.length) {
			(async () => {
				const response = getAllItems("planets");
				dispatch(setPlanets(await response));
			})();
		}
		if (!starships.length) {
			(async () => {
				const response = getAllItems("starships");
				dispatch(setStarships(await response));
			})();
		}
	}, [dispatch, films, people, vehicles, planets, starships, species]);

	if (
		!vehicles.length ||
		!planets.length ||
		!people.length ||
		!films.length ||
		!starships.length ||
		!species.length
	) {
		return (
			<Skeleton
				variant="rectangular"
				animation="wave"
				sx={detailsClasses.skeleton}
			/>
		);
	}

	const currentFilm = films.find(
		(film: FilmsResultsArray) => film.title === movieTitle
	);

	const findCharacters = people.filter((person: PeopleResultsArray) =>
		currentFilm?.characters.includes(person.url)
	);
	const findPlanets = planets.filter((planet: PlanetsResultsArray) =>
		currentFilm?.planets.includes(planet.url)
	);
	const findSpecies = species.filter((specie: SpeciesResultsArray) =>
		currentFilm?.species.includes(specie.url)
	);

	const findStarships = starships.filter((starship: StarshipsResultsArray) =>
		currentFilm?.starships.includes(starship.url)
	);
	const findVehicles = vehicles.filter((vehicle: VehiclesResultsArray) =>
		currentFilm?.vehicles.includes(vehicle.url)
	);

	const renderCharacters = findCharacters.map(
		(character: PeopleResultsArray) => {
			const { name } = character;
			return (
				<Link key={name} style={detailsClasses.link} to={`/character/${name}`}>
					<Typography sx={detailsClasses.typographyLink}> - {name} </Typography>
				</Link>
			);
		}
	);

	const renderPlanets = findPlanets.map((planet: PlanetsResultsArray) => {
		const { name } = planet;
		return (
			<Link key={name} style={detailsClasses.link} to={`/planet/${name}`}>
				<Typography sx={detailsClasses.typographyLink}> - {name} </Typography>
			</Link>
		);
	});
	const renderSpecies = findSpecies.map((specie: SpeciesResultsArray) => {
		const { name } = specie;
		return (
			<Link key={name} style={detailsClasses.link} to={`/specie/${name}`}>
				<Typography sx={detailsClasses.typographyLink}> - {name} </Typography>
			</Link>
		);
	});

	const renderStarships = findStarships.map(
		(starship: StarshipsResultsArray) => {
			const { name } = starship;
			return (
				<Link key={name} style={detailsClasses.link} to={`/starship/${name}`}>
					<Typography sx={detailsClasses.typographyLink}> - {name} </Typography>
				</Link>
			);
		}
	);

	const renderVehicles = findVehicles.map((vehicle: VehiclesResultsArray) => {
		const { name } = vehicle;
		return (
			<Link key={name} style={detailsClasses.link} to={`/vehicle/${name}`}>
				<Typography sx={detailsClasses.typographyLink}> - {name} </Typography>
			</Link>
		);
	});

	if (!currentFilm)
		return (
			<Box>
				<Typography>Film doesn't exist</Typography>
			</Box>
		);

	const { title, release_date, producer, director, opening_crawl } =
		currentFilm;

	return (
		<Box sx={detailsClasses.box}>
			<Paper sx={detailsClasses.paper}>
				<Typography align="center" variant="h4">
					Information
				</Typography>
				<Typography>Title: {title}</Typography>
				<Typography>Release date: {release_date}</Typography>
				<Typography>Director: {director}</Typography>
				<Typography>Producer: {producer}</Typography>
			</Paper>
			<Paper sx={detailsClasses.paper}>
				<Typography align="center" variant="h4">
					Opening crawl
				</Typography>
				<Typography>{opening_crawl}</Typography>
			</Paper>
			<Paper sx={detailsClasses.paper}>
				<Typography align="center" variant="h4">
					Characters
				</Typography>
				<Box>{renderCharacters}</Box>
			</Paper>
			<Paper sx={detailsClasses.paper}>
				<Typography align="center" variant="h4">
					Planets
				</Typography>
				<Box>{renderPlanets}</Box>
			</Paper>
			<Paper sx={detailsClasses.paper}>
				<Typography align="center" variant="h4">
					Species
				</Typography>
				<Box>{renderSpecies}</Box>
			</Paper>
			<Paper sx={detailsClasses.paper}>
				<Typography align="center" variant="h4">
					Starships
				</Typography>
				<Box>{renderStarships}</Box>
			</Paper>
			<Paper sx={detailsClasses.paper}>
				<Typography align="center" variant="h4">
					Vehicles
				</Typography>
				<Box>{renderVehicles}</Box>
			</Paper>
		</Box>
	);
};

export default FilmDetails;
