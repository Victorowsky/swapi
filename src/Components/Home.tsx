import { Box, SxProps, TextField, Theme } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import ChooseCategory from "./ChooseCategory";
import UniversalView from "./UnviersalView";

interface HomeProps {}

const classes: SxProps<Theme> = {
	homeBox: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		gap: "15px",
		paddingBottom: "5px",
	},
	textField: {
		width: "200px",
	},
};

const Home: React.FC<HomeProps> = () => {
	const { category, people, films, planets, species, starships, vehicles } =
		useSelector((state: RootState) => state.api);

	const [searchValue, setSearchValue] = useState("");

	const handleChangeValue = (
		e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		setSearchValue(e.target.value);
	};

	let currentState;

	switch (category) {
		case "people":
			currentState = people;
			break;
		case "planets":
			currentState = planets;

			break;
		case "species":
			currentState = species;

			break;
		case "films":
			currentState = films;

			break;
		case "starships":
			currentState = starships;

			break;
		case "vehicles":
			currentState = vehicles;

			break;

		default:
			currentState = people;
			break;
	}

	return (
		<Box sx={classes.homeBox}>
			<ChooseCategory />
			<TextField
				sx={classes.textField}
				variant="outlined"
				placeholder={`Search ${category}`}
				value={searchValue}
				onChange={handleChangeValue}
			/>
			<UniversalView searchValue={searchValue} state={currentState} />
		</Box>
	);
};

export default Home;
