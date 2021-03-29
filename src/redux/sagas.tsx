import { call, put } from '@redux-saga/core/effects';
import axios from 'axios';
import { DataListElements, TypeName } from '../interfaces/pokemon';
import { REQUEST_DATA } from './types';

// export function* sagaWatcher() {
// 	yield takeEvery(REQUEST_DATA, sagaWorker() as any);
// }

export function* sagaWorker() {
	try {
		const payload = yield call(fetchData);
		yield put({ type: REQUEST_DATA, payload });
	} catch (error) {
		console.error('ERROR', error);
	}
}

const fetchData = async () => {
	try {
		const getListOfPokemons = (await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=20&offset=3'));
		const getPoke = await Promise.all<unknown[] | any>(
			getListOfPokemons.data.results.map(async (res: TypeName) => {
				return (await axios.get(res.url));
			})
		);

		if (getPoke) {
			console.log(getPoke);
			const getResult = getPoke.map((el: DataListElements) => {

				const ability: string[] = el?.data?.types.map(ability => ability?.type?.name.toUpperCase());

				const dataElements = {
					id: el?.data?.id || null,
					image: el?.data?.sprites?.front_shiny || null,
					name: el?.data?.name.toUpperCase() || null,
					ability: ability || null
				};

				return dataElements || null;
			});
			console.log(getResult);
			return getResult;
		}

	} catch (error) {
		console.error("ERROR", error);
	}
}; 