import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { PeopleResultsArray } from "../../api";
import { RootState } from "../../app/store";
import Person from "./Person";
import Skeletons from "../Skeletons";
import { sharedClasses } from "../sharedClasses";

interface PeopleViewProps {
	searchValue: string;
}

const PeopleView: React.FC<PeopleViewProps> = ({ searchValue }) => {
	const { people } = useSelector((state: RootState) => state.api);

	if (!people.length) {
		return (
			<Box sx={sharedClasses.view}>
				<Skeletons amount={12} />
			</Box>
		);
	}

	const filteredArray = people.filter((person) =>
		person.name.match(new RegExp(searchValue, "gi"))
	);

	const renderPerson: JSX.Element[] = filteredArray?.map(
		(person: PeopleResultsArray) => {
			return <Person key={person.name} data={person} />;
		}
	);

	return <Box sx={sharedClasses.view}>{renderPerson}</Box>;
};

export default PeopleView;
