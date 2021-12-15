import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { StarshipsResultsArray } from "../../api";
import { RootState } from "../../app/store";
import { sharedClasses } from "../sharedClasses";
import Skeletons from "../Skeletons";
import Starship from "./Starship";

interface StarshipsViewProps {
	searchValue: string;
}

const StarshipsView: React.FC<StarshipsViewProps> = ({ searchValue }) => {
	const { starships } = useSelector((state: RootState) => state.api);

	if (!starships.length) {
		return (
			<Box sx={sharedClasses.view}>
				<Skeletons amount={12} />
			</Box>
		);
	}

	const filteredArray = starships.filter((starships: StarshipsResultsArray) =>
		starships.name.match(new RegExp(searchValue, "gi"))
	);

	const renderStarships = filteredArray.map(
		(starship: StarshipsResultsArray) => {
			return <Starship key={starship.name} data={starship} />;
		}
	);

	return <Box sx={sharedClasses.view}>{renderStarships}</Box>;
};

export default StarshipsView;
