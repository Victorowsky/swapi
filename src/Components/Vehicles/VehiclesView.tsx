import { Box, SxProps, TextField, Theme } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { VehiclesResultsArray } from "../../api";
import { RootState } from "../../app/store";
import Skeletons from "../Skeletons";
import Vehicle from "./Vehicle";

interface VehiclesViewProps {}

const classes: SxProps<Theme> = {
	VehicleView: {
		display: "flex",
		width: "100%",
		gap: "15px",
		flexWrap: "wrap",
		justifyContent: "center",
	},
};

const VehiclesView: React.FC<VehiclesViewProps> = () => {
	const { vehicles } = useSelector((state: RootState) => state.api);

	const [searchValue, setSearchValue] = useState("");

	if (!vehicles.length) {
		return (
			<Box sx={classes.VehicleView}>
				<Skeletons amount={12} />
			</Box>
		);
	}

	const filteredArray = vehicles.filter((vehicle: VehiclesResultsArray) =>
		vehicle.name.match(new RegExp(searchValue, "gi"))
	);

	const renderFilms = filteredArray.map((vehicle: VehiclesResultsArray) => {
		return <Vehicle key={vehicle.name} data={vehicle} />;
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
				placeholder={"Search vehicle by name"}
			/>
			<Box sx={classes.VehicleView}>{renderFilms}</Box>
		</>
	);
};

export default VehiclesView;
