import React, { memo } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { InnerDataPokemon } from './inner-data-pokemon/inner-data-pokemon';
import { TestApi } from './test-api/test-api';

const getPagePath = {
  defaultPath: '/',
  takeEveryPokemon: '/poke/:id'
} as const;

const App: React.FC = memo(() => {

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path={ `${getPagePath.defaultPath}` } component={ TestApi } exact />
          <Route path={ `${getPagePath.takeEveryPokemon}` }
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