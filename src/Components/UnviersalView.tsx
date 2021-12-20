import { Box, SxProps, Theme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import Skeletons from "./Skeletons";
import {
	setFilms,
	setPeople,
	setPlanets,
	setSpecies,
	setStarships,
	setVehicles,
} from "../features/apiSlice";
import { useEffect } from "react";
import { RootState } from "../app/store";
import Person from "./People/Person";
import Film from "./Films/Film";
import Planet from "./Planets/Planet";
import Specie from "./Species/Spicie";
import Starship from "./Starships/Starship";
import Vehicle from "./Vehicles/Vehicle";
import { getNeedData } from "../App";

interface UniversalViewProps {
	searchValue: string;
	state: any[];
}

const classes: SxProps<Theme> = {
	view: {
		display: "flex",
		width: "100%",
		gap: "15px",
		flexWrap: "wrap",
		justifyContent: "center",
	},
};

const UniversalView: React.FC<UniversalViewProps> = ({
	searchValue,
	state,
}) => {
	const { category } = useSelector((state: RootState) => state.api);
	const dispatch = useDispatch();

	useEffect(() => {
		switch (category) {
			case "people":
				getNeedData(state, category, dispatch, setPeople);
				break;
			case "films":
				getNeedData(state, category, dispatch, setFilms);
				break;
			case "planets":
				getNeedData(state, category, dispatch, setPlanets);
				break;
			case "starships":
				getNeedData(state, category, dispatch, setStarships);
				break;
			case "species":
				getNeedData(state, category, dispatch, setSpecies);
				break;
			case "vehicles":
				getNeedData(state, category, dispatch, setVehicles);
				break;
			default:
				break;
		}
	}, [category, dispatch, state]);

	if (!state.length) {
		return (
			<Box sx={classes.view}>
				<Skeletons amount={12} />
			</Box>
		);
	}

	const filteredArray: any = state?.filter((item: any) => {
		if (item.name) {
			return item?.name?.match(new RegExp(searchValue, "gi"));
		} else if (item.title) {
			return item?.title?.match(new RegExp(searchValue, "gi"));
		}
		return false;
	});

	const renderItems: JSX.Element[] = filteredArray?.map((item: any) => {
		let jsxElement;
		switch (category) {
			case "people":
				jsxElement = <Person key={item.created} data={item} />;
				break;
			case "films":
				jsxElement = <Film key={item.created} data={item} />;
				break;
			case "planets":
				jsxElement = <Planet key={item.created} data={item} />;
				break;
			case "species":
				jsxElement = <Specie key={item.created} data={item} />;
				break;
			case "starships":
				jsxElement = <Starship key={item.created} data={item} />;
				break;
			case "vehicles":
				jsxElement = <Vehicle key={item.created} data={item} />;
				break;
			default:
				break;
		}
		return jsxElement;
	});

	return <Box sx={classes.view}>{renderItems}</Box>;
};

export default UniversalView;
