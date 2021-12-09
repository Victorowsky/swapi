import { Box, Paper, Skeleton, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import {
	FilmsResultsArray,
	PeopleResultsArray,
	PlanetsResultsArray,
} from "../../api";
import { RootState } from "../../app/store";

interface PlanetDetailsProps {}

const classes = {
	link: {
		textDecoration: "none",
		color: "inherit",
		"&:hover": {
			fontWeight: 700,
		},
	},
	typographyLink: {
		display: "flex",
		"&:hover": {
			fontWeight: 700,
		},
	},
	skeleton: {
		maxWidth: "800px",
		width: "98%",
		height: "340px",
		borderRadius: "3px",
	},
	box: {
		display: "flex",
		maxWidth: "1200px",
		width: "98%",
		minHeight: "340px",
		borderRadius: "3px",
		"flex-wrap": "wrap",
		"flex-direction": "column",
		gap: "15px",
		alignItems: "center",
		"@media(max-width:500px)": {
			width: "100%",
		},
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
};

const PlanetDetails: React.FC<PlanetDetailsProps> = () => {
	const { planets, films, people } = useSelector(
		(state: RootState) => state.api
	);

	const { planetName } = useParams();

	if (!planets.length) {
		return (
			<Skeleton variant="rectangular" animation="wave" sx={classes.skeleton} />
		);
	}

	const currentPlanet = planets.find(
		(planet: PlanetsResultsArray) => planet.name === planetName
	);

	if (!currentPlanet) {
		return <Box>Taka planeta nie istnieje</Box>;
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
			<Link key={title} style={classes.link} to={`/film/${title}`}>
				<Typography sx={classes.typographyLink}> - {title} </Typography>
			</Link>
		);
	});

	const renderResidents = findResidents.map((resident: PeopleResultsArray) => {
		const { name } = resident;
		return (
			<Link key={name} style={classes.link} to={`/character/${name}`}>
				<Typography sx={classes.typographyLink}> - {name} </Typography>
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
		<Box sx={classes.box}>
			<Paper sx={classes.paper}>
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
			<Paper sx={classes.paper}>
				<Typography variant="h4" align="center">
					Films
				</Typography>
				{renderFilms}
			</Paper>
			<Paper sx={classes.paper}>
				<Typography variant="h4" align="center">
					Residents
				</Typography>
				{renderResidents}
			</Paper>
		</Box>
	);
};

export default PlanetDetails;
