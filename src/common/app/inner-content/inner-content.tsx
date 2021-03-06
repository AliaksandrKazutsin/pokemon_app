import isDarkColor from 'is-dark-color';
import React, { memo, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { COLORS, Pokemon, Pokemons } from '../../../interfaces/pokemon';
import { addPaginatedItems, rebuildPokemonDesign, showButtonLoader, showNotification } from '../../../redux/actions';
import { getButtonLoader, getNotification, getPaginatedItems, getPokemonData, getRebuildDesign } from '../../../redux/selectors';
import { INNER_CONTENT_ABILITY_COLOR, INNER_CONTENT_BUTTONS_GROUP } from '../constants';
import { POKEMON_PATH_BY_ID } from '../routes';
import './inner-content.scss';

const REBUILD_DELAY: number = 2000;
const NOTIFICATION_DELAY: number = 4000;
const INITIAL_VALUE_POKE_SCREEN: number = 5;

export const InnerContent = memo(() => {
	const getData: Pokemons = useSelector(getPokemonData);
	const rebuildDesign: boolean = useSelector(getRebuildDesign);
	const loaderButton: boolean = useSelector(getButtonLoader);
	const notification: boolean = useSelector(getNotification);
	const paginatedItems: number = useSelector(getPaginatedItems);
	const dispatch = useDispatch();

	const scrollToDown = useRef<HTMLInputElement | null>(null);

	const rebuildDisplayItems = useCallback(() => {
		dispatch(showButtonLoader());

		setTimeout(() => {
			dispatch(rebuildPokemonDesign());
			window.scroll(0, 0);
		}, REBUILD_DELAY);

	}, [dispatch]);


	useEffect(() => {
		if (loaderButton) {
			setTimeout(() => {
				dispatch(showNotification());
			}, NOTIFICATION_DELAY);
		}
	}, [dispatch, loaderButton]);

	//replace for switch/case
	const abilityColor = useCallback((color: string) => ({
		"GRASS": COLORS.GREEN,
		"POISON": COLORS.PURPLE,
		"FIRE": COLORS.YELLOW,
		"FLYING": COLORS.BRIGHT_BLUE,
		"WATER": COLORS.BLUE,
		"BUG": COLORS.LOW_YELLOW,
		"NORMAL": COLORS.LIGHT_GREEN
	})[color], []);

	const showMorePoke = () => {
		dispatch(addPaginatedItems());
		scrollToDown.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
	};

	const countSizeData = (item: Pokemon[]) => {
		if (item) return paginatedItems;
	};
	const numberOfItems = paginatedItems ? countSizeData(getData) : INITIAL_VALUE_POKE_SCREEN;

	return (
		<>
			<div ref={ scrollToDown } />
			{ notification && <p className="wrapper-items__notification-rebuild"><i className="fa fa-check-circle-o" aria-hidden="true"></i>Design was rebuilded</p> }
			<ul className={ rebuildDesign ? 'wrapper-items__items-rebuild' : 'wrapper-items__items' } >
				{ getData.slice(0, numberOfItems).map((el => {
					return <li key={ el.id } className='wrapper-items__list-items'>
						<Link to={ {
							pathname: `${POKEMON_PATH_BY_ID}`,
							state: el
						} } >
							<img src={ el.image } alt="poke" className="wrapper-items__item-img" />
							<div>
								<p className="wrapper-items__item-name">{ el.name }</p>
								<div className="wrapper-items__wrapper-ability">
									{
										el?.ability.map((ability, id) => {
											const changeColor = abilityColor(ability);
											return (
												<p key={ id }
													style={ {
														backgroundColor: `${changeColor}`,
														color: `${isDarkColor(changeColor) ?
															INNER_CONTENT_ABILITY_COLOR.whiteColor :
															INNER_CONTENT_ABILITY_COLOR.blackColor}`
													} }
													className="wrapper-items__item-ability">
													{ ability }
												</p>
											);
										}

										)
									}
								</div>
							</div>
						</Link>
					</li>;
				})) }
			</ul>
			<button onClick={ rebuildDisplayItems } className="wrapper-items__button-rebuild" type="button" disabled={ loaderButton }>
				{ loaderButton && <i className="fa fa-refresh fa-spin" /> }
				{ !loaderButton ?
					<span>{ INNER_CONTENT_BUTTONS_GROUP.rebuildDesign }</span> :
					<span>{ INNER_CONTENT_BUTTONS_GROUP.rebuilding }</span> }
			</button>
			<div className="wrapper-items__button" >
				<button
					onClick={ showMorePoke }
					className="wrapper-items__button-show-more">
					{ INNER_CONTENT_BUTTONS_GROUP.showMore }
					<i className="fa fa-caret-down" aria-hidden="true" />
				</button>
			</div>
		</>
	);
});