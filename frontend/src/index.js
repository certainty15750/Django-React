import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import * as authActions from './actions/actionTypes';
import Routes from './routes';
import store from './store';

store.dispatch(authActions.authCheck());

const theme = createMuiTheme({
  palette: {
    primary: {main: '#3f51b5'},
    secondary: {main: '#6573c3'},
  },
});


ReactDOM.render(
  (<MuiThemeProvider theme={theme}>
      <Provider store={store}>
          <Routes />
      </Provider>
    </MuiThemeProvider>),
  document.getElementById('app'));
