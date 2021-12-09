import { Box, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { PlanetsResultsArray } from "../../api";
import { RootState } from "../../app/store";
import Planet from "./Planet";
import Skeletons from "../Skeletons";

interface PlanetsViewProps {}

const classes = {
	planetsView: {
		display: "flex",
		width: "100%",
		gap: "15px",
		"flex-wrap": "wrap",
		justifyContent: "center",
	},
};
const PlanetsView: React.FC<PlanetsViewProps> = () => {
	const { planets } = useSelector((state: RootState) => state.api);

	if (!planets.length)
		return (
			<Box sx={classes.planetsView}>
				<Skeletons amount={12} />
			</Box>
		);

	const renderPlanets: JSX.Element[] = planets?.map(
		(planet: PlanetsResultsArray) => {
			return <Planet key={planet.name} data={planet} />;
		}
	);

	return (
		<>
			<TextField variant="outlined" placeholder={"Search planet by name"} />
			<Box sx={classes.planetsView}>{renderPlanets}</Box>
		</>
	);
};

export default PlanetsView;
