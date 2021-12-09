import { Box, Paper, Skeleton, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import {
	FilmsResultsArray,
	PeopleResultsArray,
	SpeciesResultsArray,
} from "../../api";
import { RootState } from "../../app/store";

interface SpecieDetailsProps {}

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

const SpecieDetails: React.FC<SpecieDetailsProps> = () => {
	const { specieName } = useParams();

	const { species, films, people } = useSelector(
		(state: RootState) => state.api
	);

	if (!species.length)
		return (
			<Skeleton animation="wave" variant="rectangular" sx={classes.skeleton} />
		);

	const currentSpecie = species.find(
		(specie: SpeciesResultsArray) => specie.name === specieName
	);

	if (!currentSpecie)
		return (
			<Box>
				<Typography>Film doesn't exist</Typography>
			</Box>
		);

	const findFilms = films.filter((film: FilmsResultsArray) =>
		currentSpecie?.films.includes(film.url)
	);

	const findCharacters = people.filter((person: PeopleResultsArray) =>
		currentSpecie?.people.includes(person.url)
	);

	const renderFilms = findFilms.map((film: FilmsResultsArray) => {
		const { title } = film;
		return (
			<Link key={title} style={classes.link} to={`/movie/${title}`}>
				<Typography sx={classes.typographyLink}> - {title} </Typography>
			</Link>
		);
	});

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

	const {
		name,
		classification,
		designation,
		eye_colors,
		hair_colors,
		homeworld,
		language,
		skin_colors,
		average_lifespan,
		average_height,
	} = currentSpecie;

	return (
		<Box sx={classes.box}>
			<Paper sx={classes.paper}>
				<Typography align="center" variant="h4">
					Information
				</Typography>
				<Typography>Specie name: {name}</Typography>
				<Typography>Classification: {classification}</Typography>
				<Typography>Designation: {designation}</Typography>
				<Typography>Average lifespan: {average_lifespan}</Typography>
				<Typography>Average height: {average_height}</Typography>
				<Typography>Eye colors: {eye_colors}</Typography>
				<Typography>Hair colors: {hair_colors}</Typography>
				<Typography>Skin colors: {skin_colors}</Typography>
				{homeworld && <Typography>Homeworld: {hair_colors}</Typography>}
				<Typography>Language: {language}</Typography>
			</Paper>
			<Paper sx={classes.paper}>
				<Typography align="center" variant="h4">
					Movies
				</Typography>
				<Box>{renderFilms}</Box>
			</Paper>
			<Paper sx={classes.paper}>
				<Typography align="center" variant="h4">
					Characters
				</Typography>
				<Box>{renderCharacters}</Box>
			</Paper>
		</Box>
	);
};

export default SpecieDetails;
