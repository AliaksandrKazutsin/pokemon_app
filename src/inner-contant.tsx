import React, { memo } from 'react';

interface ListProps {
	getData: any[];
};

export const InnerContant = memo((props: ListProps) => {

	const { getData } = props;

	return (
		<>
			<ul className='wrapper-items__items'>
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
		</>
	);
});