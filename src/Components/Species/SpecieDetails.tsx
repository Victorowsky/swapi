import { Box, Paper, Skeleton, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import {
	FilmsResultsArray,
	getAllItems,
	PeopleResultsArray,
	SpeciesResultsArray,
} from "../../api";
import { RootState } from "../../app/store";
import { setFilms, setPeople, setSpecies } from "../../features/apiSlice";
import { detailsClasses } from "../sharedClasses";

interface SpecieDetailsProps {}

const SpecieDetails: React.FC<SpecieDetailsProps> = () => {
	const { specieName } = useParams();

	const { species, films, people } = useSelector(
		(state: RootState) => state.api
	);
	const dispatch = useDispatch();

	useEffect(() => {
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
	}, [dispatch, films, people, species]);

	if (!people.length || !films.length || !species.length) {
		return (
			<Skeleton
				variant="rectangular"
				animation="wave"
				sx={detailsClasses.skeleton}
			/>
		);
	}

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
			<Link key={title} style={detailsClasses.link} to={`/movie/${title}`}>
				<Typography sx={detailsClasses.typographyLink}> - {title} </Typography>
			</Link>
		);
	});

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
		<Box sx={detailsClasses.box}>
			<Paper sx={detailsClasses.paper}>
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
			<Paper sx={detailsClasses.paper}>
				<Typography align="center" variant="h4">
					Movies
				</Typography>
				<Box>{renderFilms}</Box>
			</Paper>
			<Paper sx={detailsClasses.paper}>
				<Typography align="center" variant="h4">
					Characters
				</Typography>
				<Box>{renderCharacters}</Box>
			</Paper>
		</Box>
	);
};

export default SpecieDetails;
