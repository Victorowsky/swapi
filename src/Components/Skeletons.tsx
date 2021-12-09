import { Skeleton } from "@mui/material";

interface SkeletonsProps {
	amount: number;
}

const classes = {
	skeleton: {
		borderRadius: "5px",
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
					width={400}
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
