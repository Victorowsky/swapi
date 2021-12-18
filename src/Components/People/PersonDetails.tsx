import { Box, Paper, Skeleton, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import {
	FilmsResultsArray,
	PeopleResultsArray,
	StarshipsResultsArray,
	VehiclesResultsArray,
} from "../../api";
import { RootState } from "../../app/store";
import { detailsClasses } from "../sharedClasses";

interface PersonDetailsProps {}

const PersonDetails: React.FC<PersonDetailsProps> = () => {
	const { personName } = useParams();

	const { people, films, planets, vehicles, starships } = useSelector(
		(state: RootState) => state.api
	);

	if (!people.length) {
		return (
			<Skeleton
				variant="rectangular"
				animation="wave"
				sx={detailsClasses.skeleton}
			/>
		);
	}

	const currentPerson: PeopleResultsArray | undefined = people.find(
		(person: PeopleResultsArray) => person.name === personName
	);

	if (!currentPerson) {
		return <Box>Character doesn't exist</Box>;
	}

	const {
		name,
		birth_year,
		eye_color,
		gender,
		hair_color,
		mass,
		homeworld,
		height,
		skin_color,
	} = currentPerson;
	const movies = currentPerson.films;
	const personVehicles = currentPerson.vehicles;
	const personStarships = currentPerson.starships;

	const performedMovies = films.filter((film: FilmsResultsArray) =>
		movies.includes(film.url)
	);

	const findHomeworld = planets.find(
		(planet) => planet.url === homeworld
	)?.name;

	const findVehicles = vehicles.filter((vehicle: VehiclesResultsArray) =>
		personVehicles.includes(vehicle.url)
	);
	const findStarships = starships.filter((starship: StarshipsResultsArray) => {
		return personStarships.includes(starship.url);
	});

	const renderPersonVehicles = findVehicles?.map(
		(vehicle: VehiclesResultsArray) => {
			const { name } = vehicle;
			return (
				<Link key={name} style={detailsClasses.link} to={`/vehicle/${name}`}>
					<Typography sx={detailsClasses.typographyLink} key={name}>
						- {name}
					</Typography>
				</Link>
			);
		}
	);

	const renderMovies = performedMovies.map((movie: FilmsResultsArray) => {
		const { title, release_date } = movie;
		return (
			<Link key={title} style={detailsClasses.link} to={`/movie/${title}`}>
				<Typography sx={detailsClasses.typographyLink} key={title}>
					- {title} ({release_date}){" "}
				</Typography>
			</Link>
		);
	});

	const renderPersonStarships = findStarships?.map(
		(starship: StarshipsResultsArray) => {
			const { name } = starship;
			return (
				<Link key={name} style={detailsClasses.link} to={`/starship/${name}`}>
					<Typography sx={detailsClasses.typographyLink} key={name}>
						- {name}
					</Typography>
				</Link>
			);
		}
	);

	return (
		<Box sx={detailsClasses.box}>
			<Paper sx={detailsClasses.paper}>
				<Typography align="center" variant="h4">
					Person details
				</Typography>
				<Typography>Name: {name}</Typography>
				<Typography>Year of birth: {birth_year}</Typography>
				<Typography>Gender: {gender}</Typography>
				<Typography>Height: {height}cm</Typography>
				<Typography>Skin color: {skin_color}</Typography>
				<Typography>
					Homeworld:
					<Link style={detailsClasses.link} to={`/planet/${findHomeworld}`}>
						{findHomeworld}
					</Link>
				</Typography>
				<Typography>Hair color: {hair_color}</Typography>
				{mass && <Typography>Mass: {mass}kg</Typography>}
				<Typography>Eye color: {eye_color}</Typography>
			</Paper>

			<Paper sx={detailsClasses.paper}>
				<Typography variant="h4">
					Movies
					{renderMovies}
				</Typography>
			</Paper>

			{Boolean(currentPerson.vehicles.length) && (
				<Paper sx={detailsClasses.paper}>
					<Typography align="center" variant="h4">
						Vehicles
						{renderPersonVehicles}
					</Typography>
				</Paper>
			)}
			{Boolean(currentPerson.starships.length) && (
				<Paper sx={detailsClasses.paper}>
					<Typography align="center" variant="h4">
						Starships
						{renderPersonStarships}
					</Typography>
				</Paper>
			)}
		</Box>
	);
};

export default PersonDetails;
