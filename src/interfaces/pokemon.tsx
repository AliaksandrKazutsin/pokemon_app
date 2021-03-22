
export interface Pokemon {
	id: number;
	name: string;
	image: string;
	ability: string[];
}
export type Pokemons = Pokemon[];
export interface DataListElements {
	id: number;
	name: string;
	sprites: FrontShiny;
	ability: string[];
	types: TypesList[];
}

export interface TypesList {
	type: TypeName;
}

export interface TypeName {
	url: string;
	name: string;
}

export interface FrontShiny {
	front_shiny: string;
}

export enum COLORS {
	GREEN = "#008000",
	PURPLE = "#800080",
	YELLOW = "#ffff00",
	BLUE = "#0000ff",
	BRIGHT_BLUE = "#a3fffb",
	LOW_YELLOW = "#fff096",
	LIGHT_GREEN = "#bfffc8"
} 