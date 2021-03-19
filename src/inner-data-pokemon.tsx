import React, { memo, useState } from 'react';
import { useHistory } from 'react-router-dom';

interface ItemId {
	data: Object;
}

export const InnerDataPokemon = memo((props: ItemId) => {

	const { data } = props;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [backToHome, setBackToHome] = useState<any>(null);
	const history = useHistory();

	const leaveCurrentPage = () => {
		setBackToHome(() => {
			return history.push('/');
		});
	};

	return (
		<>
			<p>{ `Pokemon id = ${data.id}` }</p>
			<p>{ data.name }</p>
			<button onClick={ leaveCurrentPage }>Back</button>
		</>
	);
});