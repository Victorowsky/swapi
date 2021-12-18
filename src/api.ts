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

const baseURL = "https://swapi.py4e.com/api";

export const getAllItems = async (category: string): Promise<any[]> => {
	let responseArray: any[] = [];
	let nextUrl: string = "";

	await fetch(`${baseURL}/${category}/?page=1`).then((res) =>
		res
			.json()
			.then((res) => {
				nextUrl = res.next;
				responseArray.push(...res.results);
			})
			.catch((err) => console.error(err))
	);

	while (nextUrl) {
		// eslint-disable-next-line no-loop-func
		await fetch(nextUrl).then((res) =>
			res
				.json()
				.then((res) => {
					responseArray.push(...res.results);
					nextUrl = res.next;
				})
				.catch((err) => console.error(err))
		);
	}
	return responseArray;
};
