import { Box, Paper, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import {
	FilmsResultsArray,
	PeopleResultsArray,
	VehiclesResultsArray,
} from "../../api";
import { getNeedData } from "../../App";
import { RootState } from "../../app/store";
import { setFilms, setPeople, setVehicles } from "../../features/apiSlice";
import { detailsClasses } from "../sharedClasses";

interface VehicleDetailsProps {}

const VehicleDetails: React.FC<VehicleDetailsProps> = () => {
	const { vehicleName } = useParams();

	const { vehicles, films, people } = useSelector(
		(state: RootState) => state.api
	);

	const [tryFetch, setTryFetch] = useState(true);

	const dispatch = useDispatch();

	useEffect(() => {
		if (tryFetch) {
			getNeedData(vehicles, "vehicles", dispatch, setVehicles);
			getNeedData(films, "films", dispatch, setFilms);
			getNeedData(people, "people", dispatch, setPeople);
			setTryFetch(false);
		}
	}, [dispatch, films, people, vehicles, tryFetch]);

	if (!vehicles.length || !people.length || !films.length) {
		return (
			<Skeleton
				variant="rectangular"
				animation="wave"
				sx={detailsClasses.skeleton}
			/>
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
			<Link key={name} style={detailsClasses.link} to={`/character/${name}`}>
				<Typography sx={detailsClasses.typographyLink}> - {name} </Typography>
			</Link>
		);
	});

	const renderFilms = findFilms.map((film: FilmsResultsArray) => {
		const { title } = film;
		return (
			<Link key={title} style={detailsClasses.link} to={`/movie/${title}`}>
				<Typography sx={detailsClasses.typographyLink}> - {title} </Typography>
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
		<Box sx={detailsClasses.box}>
			<Paper sx={detailsClasses.paper}>
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
			<Paper sx={detailsClasses.paper}>
				<Typography align="center" variant="h4">
					Movies
				</Typography>
				<Box>{renderFilms}</Box>
			</Paper>
			{Boolean(currentVehicle.pilots.length) && (
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

export default VehicleDetails;
