// import libs
import React from 'react';
import { BrowserRouter as Router, Switch} from 'react-router-dom';

// import components
import routes from './Routes';
import PrivateRoute from './Private';
import PublicRoute from './Public';

const Routes = () => (
  <Router>
    <Switch>
      {routes.map((route, i) => {
        if (route.auth) {
          return <PrivateRoute key={i} {...route} />
        }
        return <PublicRoute key={i} {...route} />
      })}
    </Switch>
  </Router>
);

export default Routes

