import { Skeleton, SxProps, Theme } from "@mui/material";

interface SkeletonsProps {
	amount: number;
}

const classes: SxProps<Theme> = {
	skeleton: {
		borderRadius: "5px",
		width: "95vw",
		maxWidth: "400px",
	},
};

const Skeletons: React.FC<SkeletonsProps> = ({ amount }) => {
	const renderSkeletons = () => {
		let skeletonsArray: JSX.Element[] = [];
		for (let index: number = 0; index < amount; index++) {
			skeletonsArray.push(
				<Skeleton
					key={index}
					variant="rectangular"
					height={250}
					animation="wave"
					sx={classes.skeleton}
				/>
			);
		}
		return skeletonsArray;
	};

	return <>{renderSkeletons()}</>;
};

export default Skeletons;
