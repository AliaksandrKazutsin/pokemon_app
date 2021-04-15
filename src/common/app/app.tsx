import React, { memo } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { InnerDataPokemon } from './inner-data-pokemon/inner-data-pokemon';
import { TestApi } from './test-api/test-api';

const PAGE_PATH = {
  DEFAULT: '/',
  TAKE_EVERY_POKEMON: '/poke/:id'
} as const;

const App: React.FC = memo(() => {

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path={ `${PAGE_PATH.DEFAULT}` } component={ TestApi } exact />
          <Route path={ `${PAGE_PATH.TAKE_EVERY_POKEMON}` }
            render={ ({ location }) => {
              return <InnerDataPokemon
                data={ location.state }
              />;
            } } />
        </Switch>
      </BrowserRouter>
    </div>
  );
});

export default App; 