import { Box, Typography } from "@mui/material";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
	return (
		<Box>
			<Typography variant="h3" align="center">
				Star Wars Wiki
			</Typography>
		</Box>
	);
};

export default Header;
