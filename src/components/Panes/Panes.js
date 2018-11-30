import React, { Component } from 'react';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';
import PropTypes from 'prop-types';
import { IfPermission } from '@folio/stripes/core';
import { PO } from '../PurchaseOrder';
import { POLine } from '../POLine';

class Panes extends Component {
  static propTypes = {
    initialValues: PropTypes.object,
    stripes: PropTypes.object,
    match: PropTypes.object,
    path: PropTypes.object,
    url: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.connectedPO = props.stripes.connect(PO);
    this.connectedPOLine = props.stripes.connect(POLine);
  }

  render() {
    return (
      <Switch>
        <Route
          exact
          path={`${this.props.match.path}`}
          render={props => (
            <this.connectedPO
              {...this.props}
              {...props}
            />
          )}
        />
        <IfPermission perm="po_line.item.get">
          <Route
            exact
            path={`${this.props.match.path}/po-line/view/:lineId`}
            render={props => (
              <this.connectedPOLine
                poURL={`${this.props.match.url}`}
                {...this.props}
                {...props}
              />
            )}
          />
        </IfPermission>
        <Route render={props => <this.connectedPO {...this.props} {...props} />} />
      </Switch>
    );
  }
}

export default Panes;
