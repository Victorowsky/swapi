import { Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { VehiclesResultsArray } from "../../api";
import { sharedClasses } from "../sharedClasses";

interface VehicleProps {
	data: VehiclesResultsArray;
}

const Vehicle: React.FC<VehicleProps> = ({ data }) => {
	const { name, pilots, cost_in_credits, length } = data;

	return (
		<Link to={`/vehicle/${name}`} style={sharedClasses.link}>
			<Paper sx={sharedClasses.paper}>
				<Typography variant="h5">{name}</Typography>
				<Typography>Length: {length}m</Typography>
				<Typography>Pilots: {pilots.length}</Typography>
				<Typography>Cost: {cost_in_credits}</Typography>
			</Paper>
		</Link>
	);
};

export default Vehicle;
