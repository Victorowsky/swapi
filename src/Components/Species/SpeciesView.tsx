import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { sharedClasses } from "../sharedClasses";
import Skeletons from "../Skeletons";
import Specie from "./Spicie";

interface SpeciesViewProps {
	searchValue: string;
}

const SpeciesView: React.FC<SpeciesViewProps> = ({ searchValue }) => {
	const { species } = useSelector((state: RootState) => state.api);

	if (!species.length) {
		return (
			<Box sx={sharedClasses.view}>
				<Skeletons amount={12} />
			</Box>
		);
	}

	const filteredArray = species.filter((specie) =>
		specie.name.match(new RegExp(searchValue, "gi"))
	);

	const renderSpecies = filteredArray.map((specie) => {
		return <Specie key={specie.name} data={specie} />;
	});

	return <Box sx={sharedClasses.view}>{renderSpecies}</Box>;
};

export default SpeciesView;
