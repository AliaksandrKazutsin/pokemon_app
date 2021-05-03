import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';
import { PAGE_PATH } from '../app';
import { INNER_CONTENT_BUTTON_BACK_TO_HOME_PAGE } from '../constants';
import './inner-data-pokemon.scss';

interface DataElements {
	data: Object;
}

export const InnerDataPokemon = memo(({ data }: DataElements) => {

	const history = useHistory();

	const leaveCurrentPage = () => {
		return history.push(`${PAGE_PATH.DEFAULT}`);
	};

	return (
		<div className="wrapper-inner-data">
			<p className="wrapper-inner-data__poke-name">{ INNER_CONTENT_BUTTON_BACK_TO_HOME_PAGE.pokeName } { data.name }</p>
			<img className="wrapper-inner-data__image" src={ data.image } alt="poke" />
			<button
				className="wrapper-inner-data__button"
				onClick={ leaveCurrentPage }>
				<i className="fa fa-arrow-left" aria-hidden="true"></i>
				{ INNER_CONTENT_BUTTON_BACK_TO_HOME_PAGE.buttonBack }
			</button>
		</div>
	);
});