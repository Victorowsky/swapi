import { SxProps, Theme } from "@mui/material";

export const sharedClasses:
	| SxProps<Theme>
	| React.CSSProperties
	| undefined
	| any = {
	view: {
		display: "flex",
		width: "100%",
		gap: "15px",
		flexWrap: "wrap",
		justifyContent: "center",
	},
	link: {
		textDecoration: "none",
		width: "98%",
		maxWidth: "400px",
	},
	paper: {
		maxWidth: "400px",
		width: "100%",
		height: "250px",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		gap: "15px",
		justifyContent: "center",
		transition: "300ms ease-in-out",
		cursor: "pointer",
		"&:hover": {
			backgroundColor: "#123",
		},
	},
};

export const detailsClasses:
	| SxProps<Theme>
	| React.CSSProperties
	| undefined
	| any = {
	link: {
		textDecoration: "none",
		color: "inherit",
		"&:hover": {
			fontWeight: 700,
		},
	},
	typographyLink: {
		"&:hover": {
			fontWeight: 700,
		},
	},
	box: {
		display: "flex",
		width: "100%",
		minHeight: "340px",
		borderRadius: "3px",
		flexWrap: "wrap",
		flexDirection: "column",
		gap: "15px",
		alignItems: "center",
	},
	paper: {
		display: "flex",
		flexDirection: "column",
		backgroundColor: "#121212",
		padding: "15px 30px",
		borderRadius: "3px",
		height: "fit-content",
		gap: "5px",
		minWidth: "360px",
		width: "100%",
		maxWidth: "800px",
		minHeight: "300px",
	},
	skeleton: {
		maxWidth: "800px",
		width: "98%",
		height: "340px",
		borderRadius: "3px",
	},
};
