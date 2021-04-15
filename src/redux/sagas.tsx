import { call, put } from '@redux-saga/core/effects';
import axios from 'axios';
import { DataListElements, Pokemon, TypeName } from '../interfaces/pokemon';
import { hideLoader, showLoader } from './actions';
import { ACTION_TYPES } from './types';

const ms: number = 1000;
const delay = (time: number) => new Promise<number>(resolve => setTimeout(resolve, time));

export function* sagaWorker() {
	try {
		yield put(showLoader());
		const payload = yield call(fetchData);
		yield put({ type: ACTION_TYPES.REQUEST_DATA, payload });
		yield call(delay, ms);
		yield put(hideLoader());
	} catch (error) {
		console.error('ERROR', error);
	}
}

const fetchData = async () => {
	try {
		const getListOfPokemons = (await axios.get(`${process.env.REACT_APP_API_POKEMON_KEY}`));
		const resultData = await Promise.all<unknown[] | any>(
			getListOfPokemons.data.results.map(async (res: TypeName) => {
				return (await axios.get(res.url));
			})
		);

		if (resultData) {
			const getResult = resultData.map((el: DataListElements) => {

				const ability: string[] = el?.data?.types.map(ability => ability?.type?.name.toUpperCase());

				const dataElements = {
					id: el?.data?.id || null,
					image: el?.data?.sprites?.front_shiny || null,
					name: el?.data?.name.toUpperCase() || null,
					ability: ability || null
				} as Pokemon;

				return dataElements || null;
			});

			return getResult;
		}

	} catch (error) {
		console.error("ERROR", error);
	}
};