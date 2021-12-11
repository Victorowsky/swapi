import { Paper, SxProps, Theme, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { PlanetsResultsArray } from "../../api";

interface PlanetProps {
	data: PlanetsResultsArray;
}

const classes: SxProps<Theme> | any = {
	link: {
		textDecoration: "none",
		width: "98%",
		maxWidth: "400px",
	},
	paper: {
		maxWidth: "400px",
		width: "100%",
		height: "250px",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		gap: "15px",
		justifyContent: "center",
		transition: "300ms ease-in-out",
		cursor: "pointer",
		"&:hover": {
			backgroundColor: "#123",
		},
	},
};

const Planet: React.FC<PlanetProps> = ({ data }) => {
	const { name, films, population, gravity, climate } = data;
	return (
		<Link style={classes.link} to={`/planet/${name}`}>
			<Paper sx={classes.paper}>
				<Typography variant="h5" align="center">
					{name}
				</Typography>
				<Typography>Population: {population}</Typography>
				<Typography>Gravity: {gravity}</Typography>
				<Typography>Climate: {climate}</Typography>
				<Typography>In {films.length} movies</Typography>
			</Paper>
		</Link>
	);
};

export default Planet;
