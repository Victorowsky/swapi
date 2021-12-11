import { Box, SxProps, TextField, Theme } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { FilmsResultsArray } from "../../api";
import { RootState } from "../../app/store";
import Skeletons from "../Skeletons";
import Film from "./Film";

interface FilmsViewProps {}

const classes: SxProps<Theme> = {
	FilmsView: {
		display: "flex",
		width: "100%",
		gap: "15px",
		flexWrap: "wrap",
		justifyContent: "center",
	},
};

const FilmsView: React.FC<FilmsViewProps> = () => {
	const { films } = useSelector((state: RootState) => state.api);

	const [searchValue, setSearchValue] = useState("");

	if (!films.length) {
		return (
			<Box sx={classes.FilmsView}>
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
				placeholder={"Search film by title"}
			/>
			<Box sx={classes.FilmsView}>{renderFilms}</Box>
		</>
	);
};

export default FilmsView;
