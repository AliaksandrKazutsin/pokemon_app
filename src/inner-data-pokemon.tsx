import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

interface ItenId {
	itemId: string;
}

export const InnerDataPokemon = (props: ItenId) => {

	const { itemId } = props;
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
			<div style={ { width: '500px', height: '500px' } }>
				HELLO
				{ itemId }
			</div>
			<button onClick={ leaveCurrentPage }>Back</button>
		</>
	);
};