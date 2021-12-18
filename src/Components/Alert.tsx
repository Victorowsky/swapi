import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { hideAlert } from "../features/alertSlice";

interface AlertComponentProps {}

const AlertComponent: React.FC<AlertComponentProps> = () => {
	const { type, message, isOpen } = useSelector(
		(state: RootState) => state.alert
	);
	const dispatch = useDispatch();

	return (
		<Snackbar
			open={isOpen}
			autoHideDuration={4000}
			onClose={() => dispatch(hideAlert())}
		>
			<Alert severity={type}>{message}</Alert>
		</Snackbar>
	);
};

export default AlertComponent;
