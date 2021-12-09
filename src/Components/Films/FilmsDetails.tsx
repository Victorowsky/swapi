import { Box, Paper, Skeleton, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import {
	FilmsResultsArray,
	PeopleResultsArray,
	PlanetsResultsArray,
	SpeciesResultsArray,
	StarshipsResultsArray,
	VehiclesResultsArray,
} from "../../api";
import { RootState } from "../../app/store";

interface FilmDetailsProps {}

const classes = {
	link: {
		textDecoration: "none",
		color: "inherit",
		"&:hover": {
			fontWeight: 700,
		},
	},
	typographyLink: {
		"&:hover": {
			fontWeight: 700,
		},
	},
	box: {
		display: "flex",
		width: "100%",
		minHeight: "340px",
		borderRadius: "3px",
		"flex-wrap": "wrap",
		"flex-direction": "column",
		gap: "15px",
		alignItems: "center",
	},
	paper: {
		display: "flex",
		"flex-direction": "column",
		backgroundColor: "#121212",
		padding: "15px 30px",
		borderRadius: "3px",
		height: "fit-content",
		gap: "5px",
		minWidth: "360px",
		width: "100%",
		maxWidth: "800px",
		minHeight: "300px",
	},
	skeleton: {
		maxWidth: "800px",
		width: "98%",
		height: "340px",
		borderRadius: "3px",
	},
};

const FilmDetails: React.FC<FilmDetailsProps> = () => {
	const { movieTitle } = useParams();

	const { films, people, planets, species, starships, vehicles } = useSelector(
		(state: RootState) => state.api
	);

	if (!films.length)
		return (
			<Skeleton animation="wave" variant="rectangular" sx={classes.skeleton} />
		);

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
				<Link key={name} style={classes.link} to={`/character/${name}`}>
					<Typography sx={classes.typographyLink}> - {name} </Typography>
				</Link>
			);
		}
	);

	const renderPlanets = findPlanets.map((planet: PlanetsResultsArray) => {
		const { name } = planet;
		return (
			<Link key={name} style={classes.link} to={`/planet/${name}`}>
				<Typography sx={classes.typographyLink}> - {name} </Typography>
			</Link>
		);
	});
	const renderSpecies = findSpecies.map((specie: SpeciesResultsArray) => {
		const { name } = specie;
		return (
			<Link key={name} style={classes.link} to={`/specie/${name}`}>
				<Typography sx={classes.typographyLink}> - {name} </Typography>
			</Link>
		);
	});

	const renderStarships = findStarships.map(
		(starship: StarshipsResultsArray) => {
			const { name } = starship;
			return (
				<Link key={name} style={classes.link} to={`/starship/${name}`}>
					<Typography sx={classes.typographyLink}> - {name} </Typography>
				</Link>
			);
		}
	);

	const renderVehicles = findVehicles.map((vehicle: VehiclesResultsArray) => {
		const { name } = vehicle;
		return (
			<Link key={name} style={classes.link} to={`/vehicle/${name}`}>
				<Typography sx={classes.typographyLink}> - {name} </Typography>
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
		<Box sx={classes.box}>
			<Paper sx={classes.paper}>
				<Typography align="center" variant="h4">
					Information
				</Typography>
				<Typography>Title: {title}</Typography>
				<Typography>Release date: {release_date}</Typography>
				<Typography>Director: {director}</Typography>
				<Typography>Producer: {producer}</Typography>
			</Paper>
			<Paper sx={classes.paper}>
				<Typography align="center" variant="h4">
					Opening crawl
				</Typography>
				<Typography>{opening_crawl}</Typography>
			</Paper>
			<Paper sx={classes.paper}>
				<Typography align="center" variant="h4">
					Characters
				</Typography>
				<Box>{renderCharacters}</Box>
			</Paper>
			<Paper sx={classes.paper}>
				<Typography align="center" variant="h4">
					Planets
				</Typography>
				<Box>{renderPlanets}</Box>
			</Paper>
			<Paper sx={classes.paper}>
				<Typography align="center" variant="h4">
					Species
				</Typography>
				<Box>{renderSpecies}</Box>
			</Paper>
			<Paper sx={classes.paper}>
				<Typography align="center" variant="h4">
					Starships
				</Typography>
				<Box>{renderStarships}</Box>
			</Paper>
			<Paper sx={classes.paper}>
				<Typography align="center" variant="h4">
					Vehicles
				</Typography>
				<Box>{renderVehicles}</Box>
			</Paper>
		</Box>
	);
};

export default FilmDetails;
