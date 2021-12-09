import { Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { PlanetsResultsArray } from "../../api";

interface PlanetProps {
	data: PlanetsResultsArray;
}

const classes = {
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
		"flex-direction": "column",
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
	const { name } = data;

	return (
		<Link style={classes.link} to={`/planet/${name}`}>
			<Paper sx={classes.paper}>
				<Typography variant="h5" align="center">
					{name}
				</Typography>
			</Paper>
		</Link>
	);
};

export default Planet;
