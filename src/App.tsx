import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { InnerDataPokemon } from './inner-data-pokemon';
import { TestApi } from './test-api';

const App = () => {

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path='/' component={ TestApi } exact />
          <Route path='/poke/:id'
            render={ ({ match }) => {
              const { id } = match.params;
              console.log(match);
              return <InnerDataPokemon itemId={ id } />;
            } } />
        </Switch>
      </BrowserRouter>

    </div>
  );
};

export default App;
