import React, { Component } from 'react';
import {
  cloneDeep,
  get,
} from 'lodash';
import PropTypes from 'prop-types';
import queryString from 'query-string';

import { Layer } from '@folio/stripes/components';

import transitionToParams from '../Utils/transitionToParams';
import { POLineForm } from '../POLine';
import { CURRENCY } from '../POLine/Cost/FieldCurrency';

class LayerPOLine extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    parentMutator: PropTypes.object.isRequired,
    parentResources: PropTypes.object.isRequired,
    stripes: PropTypes.object.isRequired,
    initialValues: PropTypes.object,
    onCancel: PropTypes.func,
    order: PropTypes.object,
    lineMutator: PropTypes.shape({
      POST: PropTypes.func,
      PUT: PropTypes.func,
      DELETE: PropTypes.func,
    }).isRequired,
  }

  constructor(props) {
    super(props);
    this.transitionToParams = transitionToParams.bind(this);
    this.connectedPOLineForm = props.stripes.connect(POLineForm);
  }

  submitPOLine(data) {
    const newLine = cloneDeep(data);
    const { lineMutator, onCancel } = this.props;

    lineMutator.POST(newLine).then(() => {
      onCancel();
    });
  }

  updatePOLine(data) {
    const line = cloneDeep(data);
    const { lineMutator, parentMutator, location: { pathname } } = this.props;

    lineMutator.PUT(line).then(() => {
      parentMutator.query.update({
        _path: `${pathname}`,
        layer: null,
      });
    });
  }

  deletePOLine = (lineId) => {
    const { lineMutator, order, parentMutator } = this.props;

    lineMutator.DELETE({ id: lineId }).then(() => {
      parentMutator.query.update({
        _path: `/orders/view/${order.id}`,
        layer: null,
      });
    });
  }

  getCreatePOLIneInitialValues() {
    const { match } = this.props;
    const orderId = get(match, 'params.id');

    const newObj = {
      cost: {
        currency: CURRENCY.usd,
      },
      vendor_detail: {
        instructions: '',
      },
      eresource: {},
    };

    if (orderId) {
      newObj.purchase_order_id = orderId;
    }

    return newObj;
  }

  render() {
    const { initialValues, location } = this.props;
    const { layer } = location.search ? queryString.parse(location.search) : {};

    if (layer === 'create-po-line') {
      return (
        <Layer
          isOpen
          contentLabel="Create PO Line Dialog"
        >
          <this.connectedPOLineForm
            initialValues={this.getCreatePOLIneInitialValues()}
            onSubmit={(record) => { this.submitPOLine(record); }}
            {...this.props}
          />
        </Layer>
      );
    } else if (layer === 'edit-po-line') {
      return (
        <Layer
          isOpen
          contentLabel="Edit PO Line Dialog"
        >
          <this.connectedPOLineForm
            initialValues={initialValues}
            onSubmit={(record) => { this.updatePOLine(record); }}
            deletePOLine={this.deletePOLine}
            {...this.props}
          />
        </Layer>
      );
    }

    return null;
  }
}

export default LayerPOLine;
