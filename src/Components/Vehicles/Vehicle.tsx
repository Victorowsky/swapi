import { Paper, SxProps, Theme, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { VehiclesResultsArray } from "../../api";

interface VehicleProps {
	data: VehiclesResultsArray;
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

const Vehicle: React.FC<VehicleProps> = ({ data }) => {
	const { name, pilots, cost_in_credits, length } = data;

	return (
		<Link to={`/vehicle/${name}`} style={classes.link}>
			<Paper sx={classes.paper}>
				<Typography variant="h5">{name}</Typography>
				<Typography>Length: {length}m</Typography>
				<Typography>Pilots: {pilots.length}</Typography>
				<Typography>Cost: {cost_in_credits}</Typography>
			</Paper>
		</Link>
	);
};

export default Vehicle;
