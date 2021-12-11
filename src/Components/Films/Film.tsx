import { Paper, SxProps, Theme, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { FilmsResultsArray } from "../../api";

interface FilmProps {
	data: FilmsResultsArray;
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

const Film: React.FC<FilmProps> = ({ data }) => {
	const { title, release_date, director } = data;

	return (
		<Link to={`/movie/${title}`} style={classes.link}>
			<Paper sx={classes.paper}>
				<Typography variant="h5"> {title}</Typography>
				<Typography>Release date: {release_date}</Typography>
				<Typography>Directed by: {director}</Typography>
			</Paper>
		</Link>
	);
};

export default Film;
