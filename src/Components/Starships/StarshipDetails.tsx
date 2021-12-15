import { Box, Paper, Skeleton, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { PeopleResultsArray, StarshipsResultsArray } from "../../api";
import { RootState } from "../../app/store";
import { FilmsResultsArray } from "../../api";
import { Link } from "react-router-dom";
import { detailsClasses } from "../sharedClasses";

interface StarshipDetailsProps {}

const StarshipDetails: React.FC<StarshipDetailsProps> = () => {
	const { starshipName } = useParams();

	const { starships, films, people } = useSelector(
		(state: RootState) => state.api
	);

	if (!starships.length)
		return (
			<Skeleton
				animation="wave"
				variant="rectangular"
				sx={detailsClasses.skeleton}
			/>
		);

	const currentStarship = starships.find(
		(starship: StarshipsResultsArray) => starship.name === starshipName
	);

	if (!currentStarship)
		return (
			<Box>
				<Typography>Starship doesn't exist</Typography>
			</Box>
		);

	const findFilms = films?.filter((film: FilmsResultsArray) =>
		currentStarship.films.includes(film.url)
	);

	const findPilots = people?.filter((person: PeopleResultsArray) =>
		currentStarship.pilots.includes(person.url)
	);

	const renderFilms = findFilms.map((film: FilmsResultsArray) => {
		const { title } = film;
		return (
			<Link key={title} style={detailsClasses.link} to={`/movie/${title}`}>
				<Typography sx={detailsClasses.typographyLink}> - {title} </Typography>
			</Link>
		);
	});
	const renderPilots = findPilots.map((pilot: PeopleResultsArray) => {
		const { name } = pilot;
		return (
			<Link key={name} style={detailsClasses.link} to={`/character/${name}`}>
				<Typography sx={detailsClasses.typographyLink}> - {name} </Typography>
			</Link>
		);
	});

	const {
		name,
		model,
		max_atmosphering_speed,
		passengers,
		starship_class,
		length,
		manufacturer,
		hyperdrive_rating,
		crew,
		cost_in_credits,
		cargo_capacity,
		consumables,
		MGLT,
	} = currentStarship;

	return (
		<Box sx={detailsClasses.box}>
			<Paper sx={detailsClasses.paper}>
				<Typography align="center" variant="h4">
					Information
				</Typography>
				<Typography>Starship name: {name}</Typography>
				<Typography>Model: {model}</Typography>
				<Typography>Starship class: {starship_class}</Typography>
				<Typography>
					Max atomosphering speed: {max_atmosphering_speed} km/h
				</Typography>
				<Typography>Crew: {crew}</Typography>
				<Typography>Passengers: {passengers}</Typography>
				<Typography>Length: {length} m</Typography>
				<Typography>Manufacturer: {manufacturer}</Typography>
				<Typography>Hyperdrive Rating: {hyperdrive_rating}</Typography>
				<Typography>MGLT: {MGLT}</Typography>
				<Typography>Cargo capacity: {cargo_capacity}</Typography>
				<Typography>Consumables: {consumables}</Typography>
				<Typography>Cost: {cost_in_credits}</Typography>
			</Paper>
			{currentStarship.films.length && (
				<Paper sx={detailsClasses.paper}>
					<Typography align="center" variant="h4">
						Movies
					</Typography>
					<Box>{renderFilms}</Box>
				</Paper>
			)}
			{Boolean(currentStarship.pilots.length) && (
				<Paper sx={detailsClasses.paper}>
					<Typography align="center" variant="h4">
						Pilots
					</Typography>
					<Box>{renderPilots}</Box>
				</Paper>
			)}
		</Box>
	);
};

export default StarshipDetails;
