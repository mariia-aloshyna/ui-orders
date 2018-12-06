import React, { Component } from 'react';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';
import PropTypes from 'prop-types';
import { IfPermission } from '@folio/stripes/core';
import { PO } from '../PurchaseOrder';
import { POLine } from '../POLine';

class Panes extends Component {
  static propTypes = {
    connectedSource: PropTypes.object.isRequired,
    editLink: PropTypes.string.isRequired,
    stripes: PropTypes.shape({
      connect: PropTypes.func.isRequired,
    }).isRequired,
    parentMutator: PropTypes.object.isRequired,
    parentResources: PropTypes.object.isRequired,
    onEdit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onCloseEdit: PropTypes.func.isRequired,
    tagsToggle: PropTypes.func.isRequired,
    paneWidth: PropTypes.string.isRequired,
    match: PropTypes.shape({
      path: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired,
    path: PropTypes.object,
    url: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.connectedPO = props.stripes.connect(PO);
    this.connectedPOLine = props.stripes.connect(POLine);
  }

  render() {
    const { match: { path, url } } = this.props;

    return (
      <Switch>
        <Route
          exact
          path={path}
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
            path={`${path}/po-line/view/:lineId`}
            render={props => (
              <this.connectedPOLine
                poURL={url}
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
