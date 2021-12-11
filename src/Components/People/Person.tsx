import { Paper, SxProps, Theme, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { PeopleResultsArray } from "../../api";

interface PersonProps {
	data: PeopleResultsArray;
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
		minHeight: "250px",
		display: "flex",
		flexDirection: "column",
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
	const { name, birth_year, films, vehicles, starships } = data;

	return (
		<Link style={classes.link} to={`/character/${name}`}>
			<Paper sx={classes.paper}>
				<Typography variant="h5">{name}</Typography>
				<Typography>Year of birth: {birth_year}</Typography>
				<Typography>Performed in {films.length} movies</Typography>
				<Typography>Has {vehicles.length} vehicles</Typography>
				<Typography>Has {starships.length} starships</Typography>
			</Paper>
		</Link>
	);
};

export default Person;
