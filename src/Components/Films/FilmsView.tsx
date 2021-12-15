import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { FilmsResultsArray } from "../../api";
import { RootState } from "../../app/store";
import { sharedClasses } from "../sharedClasses";
import Skeletons from "../Skeletons";
import Film from "./Film";

interface FilmsViewProps {
	searchValue: string;
}

const FilmsView: React.FC<FilmsViewProps> = ({ searchValue }) => {
	const { films } = useSelector((state: RootState) => state.api);

	if (!films.length) {
		return (
			<Box sx={sharedClasses.view}>
				<Skeletons amount={12} />
			</Box>
		);
	}

	const filteredArray = films.filter((film: FilmsResultsArray) =>
		film.title.match(new RegExp(searchValue, "gi"))
	);

	const renderFilms = filteredArray.map((film) => {
		return <Film key={film.title} data={film} />;
	});

	return <Box sx={sharedClasses.view}>{renderFilms}</Box>;
};

export default FilmsView;
