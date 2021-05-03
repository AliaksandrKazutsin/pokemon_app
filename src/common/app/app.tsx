import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { isLoggedIn } from '../../redux/actions';
import { pageLogin } from '../../redux/selectors';
import { InnerDataPokemon } from './inner-data-pokemon/inner-data-pokemon';
import { Login } from './login-page/login-page';
import { PokemonsPage } from './pokemons-page/pokemons-page';

export const PAGE_PATH = {
  LOGIN: '/login',
  DEFAULT: '/',
  TAKE_EVERY_POKEMON: '/pokemons/:id'
} as const;

const App: React.FC = memo(() => {

  const login = useSelector(pageLogin);
  const dispatch = useDispatch();

  const onLogIn = () => {
    dispatch(isLoggedIn());
  };

  return (

    <BrowserRouter>
      <Switch>
        <Route path={ `${PAGE_PATH.LOGIN}` } render={ () => <Login onLogin={ onLogIn } login={ login } /> } />
        <Route path={ `${PAGE_PATH.DEFAULT}` } render={ () => <PokemonsPage login={ login } /> } exact />
        {/* <Route path={ `${PAGE_PATH.DEFAULT}` } component={TestApi} exact/> */ }
        <Route path={ `${PAGE_PATH.TAKE_EVERY_POKEMON}` }
          render={ ({ location }) => {
            return <InnerDataPokemon
              data={ location.state }
            />;
          } } />

      </Switch>
    </BrowserRouter>

  );
});

export default App;