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
  }

  constructor(props) {
    super(props);
    this.transitionToParams = transitionToParams.bind(this);
    this.connectedPOLineForm = props.stripes.connect(POLineForm);
  }

  submitPOLine(data) {
    const newLine = cloneDeep(data);

    delete newLine.cost;
    delete newLine.created;
    delete newLine.source;
    delete newLine.vendor_detail;
    this.props.parentMutator.poLine.POST(newLine).then(() => {
      this.props.onCancel();
    });
  }

  updatePOLine(data) {
    const { parentMutator, location: { pathname } } = this.props;

    parentMutator.poLine.PUT(data).then(() => {
      parentMutator.query.update({
        _path: `${pathname}`,
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
      source: {},
      vendor_detail: {},
    };

    if (orderId) {
      newObj.purchase_order_id = orderId;
    }

    return newObj;
  }

  render() {
    const { initialValues, location } = this.props;
    const query = location.search ? queryString.parse(location.search) : {};

    return (
      <div>
        <Layer
          isOpen={query.layer ? query.layer === 'create-po-line' : false}
          contentLabel="Create PO Line Dialog"
        >
          <this.connectedPOLineForm
            initialValues={this.getCreatePOLIneInitialValues()}
            onSubmit={(record) => { this.submitPOLine(record); }}
            {...this.props}
          />
        </Layer>
        <Layer
          isOpen={query.layer ? query.layer === 'edit-po-line' : false}
          contentLabel="Edit PO Line Dialog"
        >
          <this.connectedPOLineForm
            initialValues={initialValues}
            onSubmit={(record) => { this.updatePOLine(record); }}
            {...this.props}
          />
        </Layer>
      </div>
    );
  }
}

export default LayerPOLine;
