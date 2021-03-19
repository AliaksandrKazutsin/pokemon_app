import React, { memo } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { InnerDataPokemon } from './inner-data-pokemon';
import { TestApi } from './test-api';



const App: React.FC = memo(() => {

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path='/' component={ TestApi } exact />
          <Route path='/poke/:id'
            render={ ({ location }) => {
              console.log(location);
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
