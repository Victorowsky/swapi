import { Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { StarshipsResultsArray } from "../../api";
import { sharedClasses } from "../sharedClasses";

interface StarshipProps {
	data: StarshipsResultsArray;
}

const Starship: React.FC<StarshipProps> = ({ data }) => {
	const { name, length, cost_in_credits, pilots } = data;

	return (
		<Link to={`/starship/${name}`} style={sharedClasses.link}>
			<Paper sx={sharedClasses.paper}>
				<Typography variant="h5" align="center">
					{name}
				</Typography>
				<Typography>Length: {length}m</Typography>
				<Typography>Pilots: {pilots?.length}</Typography>
				<Typography>Cost: {cost_in_credits}</Typography>
			</Paper>
		</Link>
	);
};

export default Starship;
