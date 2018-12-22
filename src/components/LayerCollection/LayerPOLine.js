import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  cloneDeep,
  get,
} from 'lodash';
import moment from 'moment';
import queryString from 'query-string';

import { Layer } from '@folio/stripes/components';

import transitionToParams from '../Utils/transitionToParams';
import { POLineForm } from '../POLine';
import { CURRENCY } from '../POLine/Cost/FieldCurrency';
import LinesLimit from '../PurchaseOrder/LinesLimit';

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

    this.state = {
      openModal: false,
    };
    this.transitionToParams = transitionToParams.bind(this);
    this.connectedPOLineForm = props.stripes.connect(POLineForm);
  }

  openModal = () => {
    this.setState({
      openModal: true,
    });
  }

  closeModal = () => {
    this.setState({
      openModal: false,
    });
  }

  submitPOLine = async (data) => {
    const newLine = cloneDeep(data);
    const { lineMutator, onCancel } = this.props;

    try {
      const response = await lineMutator.POST(newLine);
      if (!response.id) throw new Error(response);
      onCancel();
    } catch (e) {
      const errors = await e.json();
      if (errors.errors.find(el => el.code === 'lines_limit')) this.openModal();
    }
  }

  createOrder = async () => {
    const { order, parentMutator } = this.props;
    const newOrder = cloneDeep(order);

    newOrder.created = moment.utc().format();
    delete newOrder.adjustment;
    delete newOrder.assigned_to_user;
    delete newOrder.created_by_name;
    delete newOrder.id;
    delete newOrder.po_lines;
    delete newOrder.vendor_name;

    const postedOrder = await parentMutator.records.POST(newOrder);
    parentMutator.query.update({
      _path: `/orders/view/${postedOrder.id}`,
      layer: null,
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
          <LinesLimit
            open={this.state.openModal}
            close={this.closeModal}
            createOrder={this.createOrder}
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
