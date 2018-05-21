// @flow
import React, { Component } from 'react';

import type { ComponentType } from 'react';

export type Routes = {
  [key: string]: ComponentType<any>,
};

type Props = {
  routes: Routes,
  initialRoute: string,
};

type State = {
  route: string,
};

export default class LightRouter extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      route: props.initialRoute,
    };
  }

  changeRoute(route: string) {
    this.setState({route});
  }

  render() {
    const {routes} = this.props;
    const {route} = this.state;
    const ActiveRoute: ComponentType<any> = routes[route];
    return <ActiveRoute changeRoute={this.changeRoute.bind(this)}
                        route={route}/>;
  }
}
