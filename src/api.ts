interface SpiciesResultsArray {
	average_height: string;
	average_lifespan: string;
	classification: string;
	created: string;
	designation: string;
	edited: string;
	eye_colors: string;
	films: string[];
	hair_colors: string;
	homeworld: string;
	language: string;
	name: string;
	people: string[];
	skin_colors: string;
	url: string;
}

export interface Spicies {
	count: number;
	next?: string;
	previous?: string;
	results: SpiciesResultsArray[];
}

interface FilmsResultsArray {
	characters: string[];
	created: string;
	director: string;
	edited: string;
	episode_id: number;
	opening_crawl: string;
	planets: string[];
	producer: string;
	release_date: string;
	species: string[];
	starships: string[];
	title: string;
	url: string;
	vehicles: string[];
}
export interface Films {
	count: number;
	next?: string;
	previous?: string;
	results: FilmsResultsArray[];
}

export const getData = () => {
	return fetch("https://swapi.dev/api/").then((res) => res.json());
};

export const getFilms = (page: number = 1) => {
	return fetch(`https://swapi.dev/api/films/?page=${page}`).then((res) =>
		res.json()
	);
};
export const getPeople = (page: number = 1) => {
	return fetch(`https://swapi.dev/api/people/?page=${page}`).then((res) =>
		res.json()
	);
};

export const getPlanets = (page: number = 1) => {
	return fetch(`https://swapi.dev/api/planets/?page=${page}`).then((res) =>
		res.json()
	);
};

export const getSpecies = (page: number = 1) => {
	return fetch(`https://swapi.dev/api/species/?page=${page}`).then((res) =>
		res.json()
	);
};
export const getStarships = (page: number = 1) => {
	return fetch(`https://swapi.dev/api/starship/?page=${page}`).then((res) =>
		res.json()
	);
};
export const getVehicles = (page: number = 1) => {
	return fetch(`https://swapi.dev/api/vehicles/?page=${page}`).then((res) =>
		res.json()
	);
};
