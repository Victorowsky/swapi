import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import ChooseCategory from "./ChooseCategory";
import FilmsView from "./Films/FilmsView";
import PeopleView from "./People/PeopleView";
import PlanetsView from "./Planets/PlanetsView";
import SpeciesView from "./Species/SpeciesView";
import StarshipsView from "./Starships/StarshipsView";
import VehiclesView from "./Vehicles/VehiclesView";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
	const { category } = useSelector((state: RootState) => state.api);

	const [searchValue, setSearchValue] = useState("");

	const handleChangeValue = (
		e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		setSearchValue(e.target.value);
	};

	useEffect(() => {}, []);

	let currentComponent: JSX.Element;

	switch (category) {
		case "characters":
			currentComponent = <PeopleView searchValue={searchValue} />;
			break;
		case "planets":
			currentComponent = <PlanetsView searchValue={searchValue} />;
			break;
		case "species":
			currentComponent = <SpeciesView searchValue={searchValue} />;
			break;
		case "films":
			currentComponent = <FilmsView searchValue={searchValue} />;
			break;
		case "starships":
			currentComponent = <StarshipsView searchValue={searchValue} />;
			break;
		case "vehicles":
			currentComponent = <VehiclesView searchValue={searchValue} />;
			break;

		default:
			currentComponent = <PeopleView searchValue={searchValue} />;
			break;
	}

	return (
		<>
			<ChooseCategory />
			<TextField
				variant="outlined"
				placeholder="Search by name"
				value={searchValue}
				onChange={handleChangeValue}
			/>
			{currentComponent}
		</>
	);
};

export default Home;
