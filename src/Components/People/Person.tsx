import { Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { PeopleResultsArray } from "../../api";

interface PersonProps {
	data: PeopleResultsArray;
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
		minHeight: "250px",
		display: "flex",
		"flex-direction": "column",
		alignItems: "center",
		gap: "15px",
		padding: "15px",
		justifyContent: "center",
		transition: "300ms ease-in-out",
		cursor: "pointer",
		"&:hover": {
			backgroundColor: "#123",
		},
	},
};

const Person: React.FC<PersonProps> = ({ data }) => {
	const { name } = data;

	return (
		<Link style={classes.link} to={`/person/${name}`}>
			<Paper sx={classes.paper}>
				<Typography variant="h5">{name}</Typography>

				{/* <Typography>Year of birth: {birth_year}</Typography>

				<Typography>Height: {height}cm</Typography>

				<Typography>Gender: {gender}</Typography>

				<Typography>Played in {films.length} movies</Typography>

				<Typography>Has {vehicles.length} vehicles</Typography>

				<Typography>Has {starships.length} starships</Typography> */}
			</Paper>
		</Link>
	);
};

export default Person;
