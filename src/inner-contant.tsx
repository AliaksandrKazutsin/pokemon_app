import React, { memo, useCallback, useEffect, useState } from 'react';

interface ListProps {
	getData: any[];
};

export const InnerContant = memo((props: ListProps) => {

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
					return <li key={ el.id } className='wrapper-items__list-items'>
						<img src={ el.sprites.front_shiny } alt="poke" className="wrapper-items__item-img" />
						<div>
							<p className="wrapper-items__item-name">{ el.name.toUpperCase() }</p>
							<div className="wrapper-items__wrapper-ability">
								{ el.types.map((ability, i) => <p key={ i } className="wrapper-items__item-ability">{ ability.type.name.toUpperCase() }</p>) }
							</div>
						</div>
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
					<span>Rebuild design</span> :
					<span>Rebuilding...</span> }
			</button>
		</>
	);
});