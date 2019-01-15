import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';

import { Layer } from '@folio/stripes/components';

import transitionToParams from '../Utils/transitionToParams';
import { updateOrderResource } from '../Utils/orderResource';
import { POForm } from '../PurchaseOrder';

class LayerPO extends Component {
  static propTypes = {
    order: PropTypes.object,
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
  }

  async updatePO(order) {
    const { parentMutator, onCancel } = this.props;

    try {
      await updateOrderResource(order, parentMutator.records);
      onCancel();
    } catch (e) {
      // console.error(e);
    }
  }

  render() {
    const { order, location } = this.props;
    const { layer } = location.search ? queryString.parse(location.search) : {};

    if (layer === 'edit') {
      return (
        <Layer
          isOpen
          contentLabel="Edit Order Dialog"
        >
          <this.connectedPOForm
            {...this.props}
            initialValues={order}
            onSubmit={(record) => { this.updatePO(record); }}
          />
        </Layer>
      );
    }

    return null;
  }
}

export default LayerPO;
