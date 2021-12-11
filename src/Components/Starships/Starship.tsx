import { Paper, SxProps, Theme, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { StarshipsResultsArray } from "../../api";

interface StarshipProps {
	data: StarshipsResultsArray;
}

const classes: SxProps<Theme> = {
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

const Starship: React.FC<StarshipProps> = ({ data }) => {
	const { name, length, cost_in_credits, pilots } = data;

	return (
		<Link
			to={`/starship/${name}`}
			style={{
				textDecoration: "none",
				width: "98%",
				maxWidth: "400px",
			}}
		>
			<Paper sx={classes.paper}>
				<Typography variant="h5" align="center">
					{name}
				</Typography>
				<Typography>Length: {length}m</Typography>
				<Typography>Pilots: {pilots.length}</Typography>
				<Typography>Cost: {cost_in_credits}</Typography>
			</Paper>
		</Link>
	);
};

export default Starship;
