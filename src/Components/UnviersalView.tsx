import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import Skeletons from "./Skeletons";
import { sharedClasses } from "./sharedClasses";
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
import { getAllItems } from "../api";
import Person from "./People/Person";
import Film from "./Films/Film";
import Planet from "./Planets/Planet";
import Specie from "./Species/Spicie";
import Starship from "./Starships/Starship";
import Vehicle from "./Vehicles/Vehicle";

interface UniversalViewProps {
	searchValue: string;
	state: any[];
}

const UniversalView: React.FC<UniversalViewProps> = ({
	searchValue,
	state,
}) => {
	const { category } = useSelector((state: RootState) => state.api);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!state.length) {
			(async () => {
				const items = await getAllItems(category);
				switch (category) {
					case "people":
						dispatch(setPeople(items));
						break;
					case "films":
						dispatch(setFilms(items));
						break;
					case "planets":
						dispatch(setPlanets(items));
						break;
					case "species":
						dispatch(setSpecies(items));
						break;
					case "starships":
						dispatch(setStarships(items));
						break;
					case "vehicles":
						dispatch(setVehicles(items));
						break;
					default:
						break;
				}
			})();
		}
	}, [category, dispatch, state]);

	if (!state.length) {
		return (
			<Box sx={sharedClasses.view}>
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

	return <Box sx={sharedClasses.view}>{renderItems}</Box>;
};

export default UniversalView;
