import React from 'react';
import {Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import IfPermission from '@folio/stripes-components/lib/IfPermission';
import _ from 'lodash';
import Pane from '@folio/stripes-components/lib/Pane';
import PaneMenu from '@folio/stripes-components/lib/PaneMenu';
import Button from '@folio/stripes-components/lib/Button';
import POPane from './POPane';
import LinePane from './LinePane';

class Panes extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.connectedPOPane = this.props.stripes.connect(POPane);
    this.connectedLinePane = this.props.stripes.connect(LinePane);
  }

  render() {
    return (
      <Switch>
        <Route
          exact
          path={`${this.props.match.path}`}
          render={props => <this.connectedPOPane
            {...this.props}
            {...props}
          />}
        />
        <IfPermission perm="vendor.item.view">
          <Route
            exact
            path={`${this.props.match.path}/po-line/view/:id`}
            render={props => <this.connectedLinePane
              poURL={`${this.props.match.url}`}
              {...this.props}
              {...props}
            />}
          />
        </IfPermission>
        <Route render={props => <this.connectedPOPane {...this.props} {...props} />} />
      </Switch>
    );
  }
}

export default Panes;
