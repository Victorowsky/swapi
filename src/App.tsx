import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Films, getFilms } from "./api";
import "./App.css";
import Movie from "./Components/Movie";
import { setFilms } from "./features/filmsSlice";

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		getFilms().then((res: Films) => dispatch(setFilms(res)));
	}, [dispatch]);

	return (
		<div className="app">
			<Movie />
		</div>
	);
}

export default App;
