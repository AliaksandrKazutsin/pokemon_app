import isDarkColor from 'is-dark-color';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { COLORS, Pokemon } from './interfaces/pokemon';

const buttonLoaderNames = {
	rebuildDesign: "Rebuild design",
	rebuilding: "Rebuilding..."
};
interface DataListProps {
	getData: Pokemon[];
}

export const InnerContent = memo(({ getData }: DataListProps) => {

	const [rebuildItems, setRebuildItems] = useState<boolean>(false);
	const [buttonLoader, setButtonLoader] = useState<boolean>(false);
	const [notification, setNotification] = useState<boolean>(false);

	const rebuildDisplayItems = useCallback(() => {
		setButtonLoader(true);

		setTimeout(() => {
			setRebuildItems(() => !rebuildItems);
			setButtonLoader(false);
			window.scroll(0, 0);
		}, 2000);

	}, [rebuildItems]);


	useEffect(() => {
		if (buttonLoader) {
			setTimeout(() => {
				setNotification(true);
			}, 2500);
		}
	}, [buttonLoader]);

	useEffect(() => {
		if (notification) {
			setTimeout(() => {
				setNotification(false);
			}, 2000);
		}
	}, [notification]);

	//replace for switch/case
	const changeColorAbility = useCallback((color: string) => ({
		"GRASS": COLORS.GREEN,
		"POISON": COLORS.PURPLE,
		"FIRE": COLORS.YELLOW,
		"FLYING": COLORS.BRIGHT_BLUE,
		"WATER": COLORS.BLUE,
		"BUG": COLORS.LOW_YELLOW,
		"NORMAL": COLORS.LIGHT_GREEN
	})[color], []);

	/*const changeColorAbility = useCallback((color: string) => {
		switch (color) {
			case "GRASS":
				return COLORS.GREEN;
			case "POISON":
				return COLORS.PURPLE;
			case "FIRE":
				return COLORS.YELLOW;
			case "FLYING":
				return COLORS.BRIGHT_BLUE;
			case "WATER":
				return COLORS.BLUE;
			case "BUG":
				return COLORS.LOW_YELLOW;
			case "NORMAL":
				return COLORS.LIGHT_GREEN;
			default:
				break;
		}
	}, []);*/

	return (
		<>
			{ notification && <p className="wrapper-items__notification-rebuild"><i className="fa fa-check-circle-o" aria-hidden="true"></i>Design was rebuilded</p> }

			<ul className={ rebuildItems ? 'wrapper-items__items-rebuild' : 'wrapper-items__items' } >
				{ getData.map((el => {
					return <li key={ el.id } className='wrapper-items__list-items'>
						<Link to={ {
							pathname: `/poke/${el.id}`,
							state: el
						} } >
							<img src={ el.image } alt="poke" className="wrapper-items__item-img" />
							<div>
								<p className="wrapper-items__item-name">{ el.name }</p>
								<div className="wrapper-items__wrapper-ability">
									{
										el.ability.map((ability, i) =>
											<p key={ i }
												style={ {
													backgroundColor: `${changeColorAbility(ability)}`,
													color: `${isDarkColor(changeColorAbility(ability)) === true ? 'white' : 'black'}`
												} }
												className="wrapper-items__item-ability">
												{ ability }
											</p>)
									}
								</div>
							</div>
						</Link>
					</li>;
				})) }
			</ul>
			<button onClick={ rebuildDisplayItems } className="wrapper-items__button-rebuild" type="button" disabled={ buttonLoader }>
				{ buttonLoader &&
					<i
						className="fa fa-refresh fa-spin"
						style={ { marginRight: "10px", fontSize: '15px' } }
					/>
				}
				{ !buttonLoader ?
					<span>{ buttonLoaderNames.rebuildDesign }</span> :
					<span>{ buttonLoaderNames.rebuilding }</span> }
			</button>
		</>
	);
});