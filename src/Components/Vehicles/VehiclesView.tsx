import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { VehiclesResultsArray } from "../../api";
import { RootState } from "../../app/store";
import { sharedClasses } from "../sharedClasses";
import Skeletons from "../Skeletons";
import Vehicle from "./Vehicle";

interface VehiclesViewProps {
	searchValue: string;
}

const VehiclesView: React.FC<VehiclesViewProps> = ({ searchValue }) => {
	const { vehicles } = useSelector((state: RootState) => state.api);

	if (!vehicles.length) {
		return (
			<Box sx={sharedClasses.view}>
				<Skeletons amount={12} />
			</Box>
		);
	}

	const filteredArray = vehicles.filter((vehicle: VehiclesResultsArray) =>
		vehicle.name.match(new RegExp(searchValue, "gi"))
	);

	const renderFilms = filteredArray.map((vehicle: VehiclesResultsArray) => {
		return <Vehicle key={vehicle.name} data={vehicle} />;
	});

	return <Box sx={sharedClasses.view}>{renderFilms}</Box>;
};

export default VehiclesView;
