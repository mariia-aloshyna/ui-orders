import React from 'react';
import {Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import IfPermission from '@folio/stripes-components/lib/IfPermission';
import _ from 'lodash';
import Pane from '@folio/stripes-components/lib/Pane';
import PaneMenu from '@folio/stripes-components/lib/PaneMenu';
import Button from '@folio/stripes-components/lib/Button';
import POView from '../POView';
import POLineView from '../POLine/POLineView';

class Panes extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.connectedPOView = this.props.stripes.connect(POView);
    this.connectedPOLineView = this.props.stripes.connect(POLineView);
  }

  render() {
    console.log(`${this.props.match.path}`);
    return (
      <div>
        <Switch>
          <Route
            exact
            path={`${this.props.match.path}`}
            render={props => <this.connectedPOView
              {...this.props}
              {...props}
            />}
          />
          {/* <IfPermission perm="vendor.item.view, purchase_order_line.item.view"> */}
            <Route
              exact
              path={`${this.props.match.path}/po/view/:id`}
              render={props => <this.connectedPOLineView
                {...this.props}
                {...props}
              />}
            />
            <Route render={props => <this.connectedPOView {...this.props} {...props}/> } />
          {/* </IfPermission> */}
        </Switch>
      </div>
    );
  }
}

export default Panes;
