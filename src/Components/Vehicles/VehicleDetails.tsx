import { Box, Paper, Skeleton, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import {
	FilmsResultsArray,
	PeopleResultsArray,
	VehiclesResultsArray,
} from "../../api";
import { RootState } from "../../app/store";

interface VehicleDetailsProps {}

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

const VehicleDetails: React.FC<VehicleDetailsProps> = () => {
	const { vehicleName } = useParams();

	const { vehicles, films, people } = useSelector(
		(state: RootState) => state.api
	);

	if (!vehicles.length) {
		return (
			<Skeleton variant="rectangular" animation="wave" sx={classes.skeleton} />
		);
	}

	const currentVehicle = vehicles.find(
		(vehicle: VehiclesResultsArray) => vehicle.name === vehicleName
	);

	if (!currentVehicle) {
		return <Box>Vehicle doesn't exist</Box>;
	}

	const findFilms = films.filter((film: FilmsResultsArray) =>
		currentVehicle?.films.includes(film.url)
	);

	const findPilots = people?.filter((person: PeopleResultsArray) =>
		currentVehicle.pilots.includes(person.url)
	);

	const renderPilots = findPilots.map((pilot: PeopleResultsArray) => {
		const { name } = pilot;
		return (
			<Link key={name} style={classes.link} to={`/character/${name}`}>
				<Typography sx={classes.typographyLink}> - {name} </Typography>
			</Link>
		);
	});

	const renderFilms = findFilms.map((film: FilmsResultsArray) => {
		const { title } = film;
		return (
			<Link key={title} style={classes.link} to={`/movie/${title}`}>
				<Typography sx={classes.typographyLink}> - {title} </Typography>
			</Link>
		);
	});

	const {
		name,
		model,
		crew,
		length,
		manufacturer,
		max_atmosphering_speed,
		passengers,
	} = currentVehicle;

	return (
		<Box sx={classes.box}>
			<Paper sx={classes.paper}>
				<Typography variant="h4" align="center">
					Information
				</Typography>
				<Typography>Vehicle name: {name}</Typography>
				<Typography>Model: {model}</Typography>
				<Typography>Crew: {crew}</Typography>
				<Typography>Passengers: {passengers}</Typography>
				<Typography>Length: {length}m</Typography>
				<Typography>Manufacturer: {manufacturer}</Typography>
				<Typography>
					Max atmosphering speed: {max_atmosphering_speed} km/h
				</Typography>
			</Paper>
			<Paper sx={classes.paper}>
				<Typography align="center" variant="h4">
					Movies
				</Typography>
				<Box>{renderFilms}</Box>
			</Paper>
			{Boolean(currentVehicle.pilots.length) && (
				<Paper sx={classes.paper}>
					<Typography align="center" variant="h4">
						Pilots
					</Typography>
					<Box>{renderPilots}</Box>
				</Paper>
			)}
		</Box>
	);
};

export default VehicleDetails;
