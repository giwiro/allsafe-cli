// @flow
import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/es/styles';
import LightRouter from './common/light-router';
import Login from './modules/login/components/Login';

// Theme
// https://material.io/tools/color/#!/?view.left=1&view.right=0&primary.color=448AFF&secondary.color=757575&primary.text.color=ffffff&secondary.text.color=ffffff
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#83b9ff',
      main: '#448aff',
      dark: '#005ecb',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#a4a4a4',
      main: '#757575',
      dark: '#494949',
      contrastText: '#ffffff',
    },
  },
});

const routes = {
  login: Login,
};

export default class App extends Component<void, void> {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <LightRouter routes={routes}
                     initialRoute="login"/>
      </MuiThemeProvider>
    );
  }
}
