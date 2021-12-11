import { Box, SxProps, TextField, Theme } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { PeopleResultsArray } from "../../api";
import { RootState } from "../../app/store";
import Person from "./Person";
import Skeletons from "../Skeletons";

interface PeopleViewProps {}

const classes: SxProps<Theme> = {
	peopleView: {
		display: "flex",
		width: "100%",
		gap: "15px",
		flexWrap: "wrap",
		justifyContent: "center",
	},
};

const PeopleView: React.FC<PeopleViewProps> = () => {
	const { people } = useSelector((state: RootState) => state.api);

	const [searchValue, setSearchValue] = useState("");

	if (!people.length) {
		return (
			<Box sx={classes.peopleView}>
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
	const handleChangeValue = (
		e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		setSearchValue(e.target.value);
	};

	return (
		<>
			<TextField
				variant="outlined"
				placeholder="Search by name"
				value={searchValue}
				onChange={handleChangeValue}
			/>

			<Box sx={classes.peopleView}>{renderPerson}</Box>
		</>
	);
};

export default PeopleView;
