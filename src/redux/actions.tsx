import { FETCH_DATA, HIDE_LOADER, SHOW_LOADER } from '../redux/types';


const fetchData = () => {
	return {
		type: FETCH_DATA as typeof FETCH_DATA
	};
};

const showLoader = () => {
	return {
		type: SHOW_LOADER as typeof SHOW_LOADER
	};
};

const hideLoader = () => {
	return {
		type: HIDE_LOADER as typeof HIDE_LOADER
	};
};

export {
	fetchData,
	showLoader,
	hideLoader
};

