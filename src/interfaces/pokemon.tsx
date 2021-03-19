
export interface DataList {
	id: number;
	name: string;
	image: string;
	ability: string[];
	description: string[];
}

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