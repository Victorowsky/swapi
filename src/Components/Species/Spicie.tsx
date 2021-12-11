import { Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { SpeciesResultsArray } from "../../api";

interface SpecieProps {
	data: SpeciesResultsArray;
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

const Specie: React.FC<SpecieProps> = ({ data }) => {
	const { name, average_height, eye_colors, hair_colors } = data;

	return (
		<Link to={`/specie/${name}`} style={classes.link}>
			<Paper sx={classes.paper}>
				<Typography variant="h5"> {name}</Typography>
				<Typography> Average height: {average_height}cm</Typography>
				<Typography> Eye colors: {eye_colors}</Typography>
				<Typography> Hair colors: {hair_colors}</Typography>
			</Paper>
		</Link>
	);
};

export default Specie;
