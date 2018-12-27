import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  cloneDeep,
  get,
} from 'lodash';
import queryString from 'query-string';

import {
  Callout,
  Layer,
} from '@folio/stripes/components';

import transitionToParams from '../Utils/transitionToParams';
import { cloneOrder } from '../Utils/orderResource';
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
      line: null,
    };
    this.transitionToParams = transitionToParams.bind(this);
    this.connectedPOLineForm = props.stripes.connect(POLineForm);
  }

  openLineLimitExceededModal = (line) => {
    this.setState({
      openModal: true,
      line,
    });
  }

  closeLineLimitExceededModal = () => {
    this.setState({
      openModal: false,
      line: null,
    });
  }

  submitPOLine = async (line) => {
    const newLine = cloneDeep(line);
    const { lineMutator, onCancel } = this.props;

    try {
      await lineMutator.POST(newLine);
      onCancel();
    } catch (e) {
      const response = await e.json();
      if (response.errors && response.errors.find(el => el.code === 'lines_limit')) {
        this.openLineLimitExceededModal(line);
      }
    }
  }

  createNewOrder = async () => {
    const { order, parentMutator } = this.props;

    try {
      const newOrder = await cloneOrder(order, parentMutator.records, this.state.line);
      parentMutator.query.update({
        _path: `/orders/view/${newOrder.id}`,
        layer: null,
      });
    } catch (e) {
      this.callout.sendCallout({
        message: <FormattedMessage id="ui-orders.errors.noCreatedOrder" />,
        type: 'error',
      });
    }
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

  createCalloutRef = ref => {
    this.callout = ref;
  };

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
            isOpen={this.state.openModal}
            closeModal={this.closeLineLimitExceededModal}
            createOrder={this.createNewOrder}
          />
          <Callout ref={this.createCalloutRef} />
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
