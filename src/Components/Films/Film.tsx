import { Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { FilmsResultsArray } from "../../api";
import { sharedClasses } from "../sharedClasses";

interface FilmProps {
	data: FilmsResultsArray;
}

const Film: React.FC<FilmProps> = ({ data }) => {
	const { title, release_date, director } = data;

	return (
		<Link to={`/movie/${title}`} style={sharedClasses.link}>
			<Paper sx={sharedClasses.paper}>
				<Typography variant="h5"> {title}</Typography>
				<Typography>Release date: {release_date}</Typography>
				<Typography>Directed by: {director}</Typography>
			</Paper>
		</Link>
	);
};

export default Film;
