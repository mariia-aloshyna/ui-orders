import React from 'react';
import PropTypes from 'prop-types';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';
import { hot } from 'react-hot-loader';
import Main from './routes/Main';
import Settings from './settings';

/*
  STRIPES-NEW-APP
  This is the main entry point into your new app.
*/

class Orders extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    showSettings: PropTypes.bool,
    stripes: PropTypes.shape({
      connect: PropTypes.func.isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
  }

  constructor(props, context) {
    super(props, context);
    this.connectedApp = props.stripes.connect(Main);
  }

  render() {
    if (this.props.showSettings) {
      return <Settings {...this.props} />;
    }
    return (
      <Switch>
        <Route
          path={`${this.props.match.path}`}
          render={props => <this.connectedApp {...props} {...this.props} />}
        />
      </Switch>
    );
  }
}

export default hot(module)(Orders);
