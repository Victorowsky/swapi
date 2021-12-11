import { Box, SxProps, TextField, Theme } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import Skeletons from "../Skeletons";
import Specie from "./Spicie";

interface SpeciesViewProps {}

const classes: SxProps<Theme> = {
	speciesView: {
		display: "flex",
		width: "100%",
		gap: "15px",
		flexWrap: "wrap",
		justifyContent: "center",
	},
};

const SpeciesView: React.FC<SpeciesViewProps> = () => {
	const { species } = useSelector((state: RootState) => state.api);

	const [searchValue, setSearchValue] = useState("");

	if (!species.length) {
		return (
			<Box sx={classes.speciesView}>
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

	const handleChangeValue = (
		e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		setSearchValue(e.target.value);
	};

	return (
		<>
			<TextField
				variant="outlined"
				value={searchValue}
				onChange={handleChangeValue}
				placeholder={"Search specie by name"}
			/>
			<Box sx={classes.speciesView}>{renderSpecies}</Box>
		</>
	);
};

export default SpeciesView;
