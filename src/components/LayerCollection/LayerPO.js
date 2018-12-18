import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';

import { Layer } from '@folio/stripes/components';

import transitionToParams from '../Utils/transitionToParams';
import updateOrderResource from '../Utils/updateOrderResource';
import { ReceiveItems, Received } from '../Receive';
import { POForm } from '../PurchaseOrder';

class LayerPO extends Component {
  static propTypes = {
    initialValues: PropTypes.object,
    location: PropTypes.object.isRequired,
    stripes: PropTypes.object.isRequired,
    onCancel: PropTypes.func,
    parentResources: PropTypes.object.isRequired,
    parentMutator: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.transitionToParams = transitionToParams.bind(this);
    this.connectedPOForm = props.stripes.connect(POForm);
    this.connectedReceiveItems = props.stripes.connect(ReceiveItems);
    this.connectedReceived = props.stripes.connect(Received);
  }

  async updatePO(order) {
    const { parentMutator, onCancel } = this.props;

    try {
      await updateOrderResource(order, parentMutator.records);
      onCancel();
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    const { initialValues, location } = this.props;
    const { layer } = location.search ? queryString.parse(location.search) : {};

    if (layer === 'edit') {
      return (
        <Layer
          isOpen
          contentLabel="Edit Order Dialog"
        >
          <this.connectedPOForm
            initialValues={initialValues}
            onSubmit={(record) => { this.updatePO(record); }}
            {...this.props}
          />
        </Layer>
      );
    } else if (layer === 'receive-items') {
      return (
        <Layer
          isOpen
          contentLabel="Receive Items"
        >
          <this.connectedReceiveItems openReceived={this.openReceived} {...this.props} />
        </Layer>
      );
    } else if (layer === 'received') {
      return (
        <Layer
          isOpen
          contentLabel="Received"
        >
          <this.connectedReceived {...this.props} />
        </Layer>
      );
    }

    return null;
  }
}

export default LayerPO;
