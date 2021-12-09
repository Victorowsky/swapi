import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Films } from "../api";
import { RootState } from "../app/store";

// interface FormProps {}

const classes = {
	formControl: {
		width: "90%",
		maxWidth: "400px",
	},
	select: {
		maxHeight: "300px",
	},
};

const Form = () => {
	const [film, setFilm] = useState<string>("");
	const [person, setPerson] = useState<string>("");

	const { films, people } = useSelector((state: RootState) => state.api);

	//@ts-ignore
	const renderMenuItemsFilms = films?.results?.map((movie) => {
		return (
			<MenuItem key={movie.title} value={movie.title}>
				{movie.title}
			</MenuItem>
		);
	});
	//@ts-ignore
	const renderMenuItemsPeople = people?.map((person) => {
		return (
			<MenuItem key={person.name} value={person.name}>
				{person.name}
			</MenuItem>
		);
	});

	return (
		<>
			<FormControl sx={classes.formControl}>
				<InputLabel id="filmLabel">Film</InputLabel>
				<Select
					sx={classes.select}
					labelId="filmLabel"
					id="film"
					value={film}
					label="Film"
					onChange={(e) => setFilm(e.target.value)}
				>
					<MenuItem value="">----</MenuItem>
					{renderMenuItemsFilms}
				</Select>
			</FormControl>
			<FormControl sx={classes.formControl}>
				<InputLabel id="personLabel">Person</InputLabel>
				<Select
					labelId="personLabel"
					id="person"
					value={person}
					label="Person"
					onChange={(e) => setPerson(e.target.value)}
				>
					<MenuItem value="">----</MenuItem>
					{renderMenuItemsPeople}
				</Select>
			</FormControl>
		</>
	);
};

export default Form;
