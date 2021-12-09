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

	let currentComponent: JSX.Element;

	switch (category) {
		case "people":
			currentComponent = <PeopleView />;
			break;
		case "planets":
			currentComponent = <PlanetsView />;
			break;
		case "species":
			currentComponent = <SpeciesView />;
			break;
		case "films":
			currentComponent = <FilmsView />;
			break;
		case "starships":
			currentComponent = <StarshipsView />;
			break;
		case "vehicles":
			currentComponent = <VehiclesView />;
			break;

		default:
			currentComponent = <PeopleView />;
			break;
	}

	return (
		<>
			<ChooseCategory />
			{currentComponent}
		</>
	);
};

export default Home;
