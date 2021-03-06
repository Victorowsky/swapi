import { Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { SpeciesResultsArray } from "../../api";
import { sharedClasses } from "../sharedClasses";

interface SpecieProps {
	data: SpeciesResultsArray;
}

const Specie: React.FC<SpecieProps> = ({ data }) => {
	const { name, average_height, eye_colors, hair_colors } = data;

	return (
		<Link to={`/specie/${name}`} style={sharedClasses.link}>
			<Paper sx={sharedClasses.paper}>
				<Typography variant="h5"> {name}</Typography>
				<Typography> Average height: {average_height}cm</Typography>
				<Typography> Eye colors: {eye_colors}</Typography>
				<Typography> Hair colors: {hair_colors}</Typography>
			</Paper>
		</Link>
	);
};

export default Specie;
