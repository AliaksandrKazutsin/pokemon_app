import React, { memo } from 'react';
import { Redirect } from 'react-router-dom';
import { PAGE_PATH } from '../app';
import { TestApi } from '../test-api/test-api';

interface LoginPage {
	login: boolean;
}

export const PokemonsPage: React.FunctionComponent<LoginPage> = memo(({ login }: LoginPage) => {
	if (login) {
		return (
			<>
				<TestApi />
			</>
		);
	}
	return <Redirect to={ `${PAGE_PATH.LOGIN}` } />;
});