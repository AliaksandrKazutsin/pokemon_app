import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';
import { innerDataPokemon_buttonBackToHomePage } from '../constants';
import './inner-data-pokemon.scss';

interface DataElements {
	data: Object;
}

export const InnerDataPokemon = memo(({ data }: DataElements) => {

	const history = useHistory();

	const leaveCurrentPage = () => {
		return history.push('/');
	};

	return (
		<div className="wrapper-inner-data">
			<p className="wrapper-inner-data__poke-name">{ innerDataPokemon_buttonBackToHomePage.pokeName } { data.name }</p>
			<img className="wrapper-inner-data__image" src={ data.image } alt="poke" />
			<button
				className="wrapper-inner-data__button"
				onClick={ leaveCurrentPage }>
				<i className="fa fa-arrow-left" aria-hidden="true"></i>
				{ innerDataPokemon_buttonBackToHomePage.buttonBack }
			</button>
		</div>
	);
});