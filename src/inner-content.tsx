import React, { memo, useCallback, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { DataList } from './interfaces/pokemon';

interface DataListProps {
	getData: DataList[];
}

export const InnerContent = memo((props: DataListProps) => {

	const { getData } = props;

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

	return (
		<>
			{ notification && <p className="wrapper-items__notification-rebuild"><i className="fa fa-check-circle-o" aria-hidden="true"></i>Design was rebuilded</p> }

			<ul className={ rebuildItems ? 'wrapper-items__items-rebuild' : 'wrapper-items__items' }>
				{ getData.map((el => {
					return <li key={ el.id } className='wrapper-items__list-items' >
						<NavLink to={ `/poke/${el.id}` }>
							<img src={ el.image } alt="poke" className="wrapper-items__item-img" />
							<div>
								<p className="wrapper-items__item-name">{ el.name }</p>
								<div className="wrapper-items__wrapper-ability">
									{ el.ability.map((ability, i) => <p key={ i } className="wrapper-items__item-ability">{ ability }</p>) }
								</div>
							</div>
						</NavLink></li>;
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
					<span>Rebuild design</span> :
					<span>Rebuilding...</span> }
			</button>
		</>
	);
});