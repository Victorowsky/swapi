import { Box, TextField } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { StarshipsResultsArray } from "../../api";
import { RootState } from "../../app/store";
import Skeletons from "../Skeletons";
import Starship from "./Starship";

interface StarshipsViewProps {}

const classes = {
	starshipsView: {
		display: "flex",
		width: "100%",
		gap: "15px",
		"flex-wrap": "wrap",
		justifyContent: "center",
	},
};

const StarshipsView: React.FC<StarshipsViewProps> = () => {
	const { starships } = useSelector((state: RootState) => state.api);

	const [searchValue, setSearchValue] = useState("");

	if (!starships.length) {
		return (
			<Box sx={classes.starshipsView}>
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
				placeholder={"Search starship by title"}
			/>
			<Box sx={classes.starshipsView}>{renderStarships}</Box>
		</>
	);
};

export default StarshipsView;
