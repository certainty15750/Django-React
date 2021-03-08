/**
 * Created by Gui on 3/11/2018.
 */

import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import LoginPage from '../Login';
import TaskPage from '../TaskPage';
import * as routes from '../../constants/routes';

const App=()=> (
        <Router>
            <Switch>
                <Route exact path={routes.LOGIN} component={LoginPage}/>
                <Route path={routes.TASK_PANEL} component={TaskPage}/>
            </Switch>
        </Router>
);
export  default App;