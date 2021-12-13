import {
	Box,
	Button,
	ButtonGroup,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SxProps,
	Theme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { changeCategory } from "../features/apiSlice";

const classes: SxProps<Theme> = {
	box: {
		display: "flex",
		width: "100%",
		justifyContent: "center",
	},

	buttonGroup: {
		"@media(max-width:600px)": {
			display: "none",
		},
	},

	formControl: {
		display: "none",
		width: "80%",
		"@media(max-width:600px)": {
			display: "flex",
		},
	},
};

const ChooseCategory: React.FC = () => {
	const dispatch = useDispatch();

	const { category } = useSelector((state: RootState) => state.api);

	const handleChooseCategory = (category: string) => {
		dispatch(changeCategory(category));
	};

	return (
		<Box sx={classes.box}>
			<ButtonGroup sx={classes.buttonGroup}>
				<Button onClick={() => handleChooseCategory("characters")}>
					Characters
				</Button>
				<Button onClick={() => handleChooseCategory("planets")}>Planets</Button>
				<Button onClick={() => handleChooseCategory("films")}>Films</Button>
				<Button onClick={() => handleChooseCategory("species")}>Species</Button>
				<Button onClick={() => handleChooseCategory("starships")}>
					Starships
				</Button>
				<Button onClick={() => handleChooseCategory("vehicles")}>
					Vehicles
				</Button>
			</ButtonGroup>

			<FormControl sx={classes.formControl}>
				<InputLabel id="categoryLabel">Category</InputLabel>
				<Select
					labelId="categoryLabel"
					id="category"
					value={category}
					label="Category"
					onChange={(e) => handleChooseCategory(e.target.value)}
				>
					<MenuItem value={"characters"}>Characters</MenuItem>
					<MenuItem value={"films"}>Films</MenuItem>
					<MenuItem value={"planets"}>Planets</MenuItem>
					<MenuItem value={"species"}>Species</MenuItem>
					<MenuItem value={"starships"}>Starships</MenuItem>
					<MenuItem value={"vehicles"}>Vehicles</MenuItem>
				</Select>
			</FormControl>
		</Box>
	);
};

export default ChooseCategory;
