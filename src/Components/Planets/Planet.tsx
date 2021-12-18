import { Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { PlanetsResultsArray } from "../../api";
import { sharedClasses } from "../sharedClasses";

interface PlanetProps {
	data: PlanetsResultsArray;
}

const Planet: React.FC<PlanetProps> = ({ data }) => {
	const { name, films, population, gravity, climate } = data;
	return (
		<Link style={sharedClasses.link} to={`/planet/${name}`}>
			<Paper sx={sharedClasses.paper}>
				<Typography variant="h5" align="center">
					{name}
				</Typography>
				<Typography>Population: {population}</Typography>
				<Typography>Gravity: {gravity}</Typography>
				<Typography>Climate: {climate}</Typography>
				<Typography>In {films?.length} movies</Typography>
			</Paper>
		</Link>
	);
};

export default Planet;
