export function loadState<T = object>(): T | undefined {
	if (!localStorage) {
		return undefined;
	}
	try {
		const serializedState = localStorage.getItem('userData');
		if (serializedState === null) {
			return undefined;
		}
		return JSON.parse(serializedState);
	} catch (err) {
		console.error('ERROR', err);
	}
};

export function saveState<T = object>(state: T): boolean {
	if (!localStorage) {
		return false;
	}
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem('userData', serializedState);
		return true;
	} catch (err) {
		console.error('ERROR', err);
	}
};