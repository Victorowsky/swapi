import { Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { PeopleResultsArray } from "../../api";
import { sharedClasses } from "../sharedClasses";

interface PersonProps {
	data: PeopleResultsArray;
}

const Person: React.FC<PersonProps> = ({ data }) => {
	const { name, birth_year, films, vehicles, starships } = data;

	return (
		<Link style={sharedClasses.link} to={`/character/${name}`}>
			<Paper sx={sharedClasses.paper}>
				<Typography variant="h5">{name}</Typography>
				<Typography>Year of birth: {birth_year}</Typography>
				<Typography>Performed in {films.length} movies</Typography>
				<Typography>Has {vehicles?.length} vehicles</Typography>
				<Typography>Has {starships?.length} starships</Typography>
			</Paper>
		</Link>
	);
};

export default Person;
