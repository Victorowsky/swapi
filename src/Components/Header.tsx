import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface HeaderProps {}

const classes = {
	link: {
		textDecoration: "none",
		color: "inherit",
	},
};

const Header: React.FC<HeaderProps> = () => {
	return (
		<Box>
			<Typography variant="h3" align="center">
				<Link style={classes.link} to="/">
					Star Wars Wiki
				</Link>
			</Typography>
		</Box>
	);
};

export default Header;
