import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { PlanetsResultsArray } from "../../api";
import { RootState } from "../../app/store";
import Planet from "./Planet";
import Skeletons from "../Skeletons";
import { sharedClasses } from "../sharedClasses";

interface PlanetsViewProps {
	searchValue: string;
}

const PlanetsView: React.FC<PlanetsViewProps> = ({ searchValue }) => {
	const { planets } = useSelector((state: RootState) => state.api);

	if (!planets.length)
		return (
			<Box sx={sharedClasses.view}>
				<Skeletons amount={12} />
			</Box>
		);

	const filteredArray = planets.filter((person) =>
		person.name.match(new RegExp(searchValue, "gi"))
	);

	const renderPlanets: JSX.Element[] = filteredArray?.map(
		(planet: PlanetsResultsArray) => {
			return <Planet key={planet.name} data={planet} />;
		}
	);

	return <Box sx={sharedClasses.view}>{renderPlanets}</Box>;
};

export default PlanetsView;
