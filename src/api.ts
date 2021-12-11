export interface SpeciesResultsArray {
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

export interface Species {
	count: number;
	next?: string;
	previous?: string;
	results: SpeciesResultsArray[];
}

export interface FilmsResultsArray {
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

export interface PeopleResultsArray {
	birth_year: string;
	created: string;
	edited: string;
	eye_color: string;
	films: string[];
	gender: string;
	hair_color: string;
	height: string;
	homeworld: string;
	mass: string;
	name: string;
	skin_color: string;
	species: string[];
	starships: string[];
	url: string;
	vehicles: string[];
}

export interface People {
	count: number;
	next?: string;
	previous?: string;
	results: PeopleResultsArray[];
}

export interface PlanetsResultsArray {
	climate: string;
	created: string;
	diameter: string;
	edited: string;
	films: string[];
	gravity: string;
	name: string;
	orbital_period: string;
	population: string;
	residents: string[];
	rotation_period: string;
	surface_water: string;
	terrain: string;
	url: string;
}

export interface Planets {
	count: number;
	next?: string;
	previous?: string;
	results: PlanetsResultsArray[];
}

export interface StarshipsResultsArray {
	MGLT: string;
	cargo_capacity: string;
	consumables: string;
	cost_in_credits: string;
	created: string;
	crew: string;
	edited: string;
	films: string[];
	hyperdrive_rating: string;
	length: string;
	manufacturer: string;
	max_atmosphering_speed: string;
	model: string;
	name: string;
	passengers: string;
	pilots: string[];
	starship_class: string;
	url: string;
}

export interface Starships {
	count: number;
	next?: string;
	previous?: string;
	results: StarshipsResultsArray[];
}

export interface VehiclesResultsArray {
	cargo_capacity: string;
	consumables: string;
	cost_in_credits: string;
	created: string;
	crew: string;
	edited: string;
	films: string[];
	length: string;
	manufacturer: string;
	max_atmosphering_speed: string;
	model: string;
	name: string;
	passengers: string;
	pilots: string[];
	url: string;
	vehicle_class: string;
}
export interface Vehicle {
	count: number;
	next?: string;
	previous?: string;
	results: VehiclesResultsArray[];
}

export const getFilms = (page: number = 1): Promise<Films> => {
	return fetch(`https://swapi.dev/api/films/?page=${page}`).then((res) =>
		res.json()
	);
};

export const getAllFilms = async (): Promise<FilmsResultsArray[]> => {
	let apiPages: number = 0;
	let counter: number = 2;
	let filmsArray: FilmsResultsArray[] = [];

	await getFilms()
		.then((res: Films) => {
			apiPages = Math.ceil(res.count / 10);
			filmsArray.push(...res.results);
		})
		.catch((err) => console.log(err));

	while (counter <= apiPages) {
		await getFilms(counter)
			.then((res: Films) => filmsArray.push(...res.results))
			.catch((err) => console.log(err));
		counter++;
	}
	return filmsArray;
};

export const getPeople = async (page: number = 1): Promise<People> => {
	return fetch(`https://swapi.dev/api/people/?page=${page}`).then((res) =>
		res.json()
	);
};

export const getAllPeople = async (): Promise<PeopleResultsArray[]> => {
	let apiPages: number = 0;
	let counter: number = 2;
	let peopleArray: PeopleResultsArray[] = [];

	await getPeople()
		.then((res: People) => {
			apiPages = Math.ceil(res.count / 10);
			peopleArray.push(...res.results);
		})
		.catch((err) => console.log(err));

	while (counter <= apiPages) {
		await getPeople(counter)
			.then((res: People) => peopleArray.push(...res.results))
			.catch((err) => console.log(err));
		counter++;
	}
	return peopleArray;
};

export const getPlanets = (page: number = 1): Promise<Planets> => {
	return fetch(`https://swapi.dev/api/planets/?page=${page}`).then((res) =>
		res.json()
	);
};

export const getAllPlanets = async (): Promise<PlanetsResultsArray[]> => {
	let apiPages: number = 0;
	let counter: number = 2;
	let planetsArray: PlanetsResultsArray[] = [];

	await getPlanets()
		.then((res: Planets) => {
			apiPages = Math.ceil(res.count / 10);
			planetsArray.push(...res.results);
		})
		.catch((err) => console.log(err));
	while (counter <= apiPages) {
		await getPlanets(counter)
			.then((res: Planets) => planetsArray.push(...res.results))
			.catch((err) => console.log(err));
		counter++;
	}
	return planetsArray;
};

export const getSpecies = (page: number = 1): Promise<Species> => {
	return fetch(`https://swapi.dev/api/species/?page=${page}`).then((res) =>
		res.json()
	);
};

export const getAllSpecies = async (): Promise<SpeciesResultsArray[]> => {
	let apiPages: number = 0;
	let counter: number = 2;
	let speciesArray: SpeciesResultsArray[] = [];

	await getSpecies()
		.then((res: Species) => {
			apiPages = Math.ceil(res.count / 10);
			speciesArray.push(...res.results);
		})
		.catch((err) => console.log(err));

	while (counter <= apiPages) {
		await getSpecies(counter)
			.then((res: Species) => speciesArray.push(...res.results))
			.catch((err) => console.log(err));
		counter++;
	}
	return speciesArray;
};

export const getStarships = (page: number = 1): Promise<Starships> => {
	return fetch(`https://swapi.dev/api/starships/?page=${page}`).then((res) =>
		res.json()
	);
};

export const getAllStarships = async (): Promise<StarshipsResultsArray[]> => {
	let apiPages: number = 0;
	let counter: number = 2;
	let starShipsArray: StarshipsResultsArray[] = [];

	await getStarships().then((res: Starships) => {
		apiPages = Math.ceil(res.count / 10);
		starShipsArray.push(...res.results);
	});

	while (counter <= apiPages) {
		await getStarships(counter)
			.then((res: Starships) => starShipsArray.push(...res.results))
			.catch((err) => console.log(err));
		counter++;
	}
	return starShipsArray;
};
export const getVehicles = (page: number = 1) => {
	return fetch(`https://swapi.dev/api/vehicles/?page=${page}`).then((res) =>
		res.json()
	);
};

export const getAllVehicles = async (): Promise<VehiclesResultsArray[]> => {
	let apiPages: number = 0;
	let counter: number = 2;
	let vehicleArray: VehiclesResultsArray[] = [];

	await getVehicles().then((res: Vehicle) => {
		apiPages = Math.ceil(res.count / 10);
		vehicleArray.push(...res.results);
	});

	while (counter <= apiPages) {
		await getVehicles(counter)
			.then((res: Vehicle) => vehicleArray.push(...res.results))
			.catch((err) => console.log(err));
		counter++;
	}
	return vehicleArray;
};
