import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  cloneDeep,
  get,
} from 'lodash';
import ReactRouterPropTypes from 'react-router-prop-types';
import queryString from 'query-string';

import {
  Callout,
  Layer,
} from '@folio/stripes/components';

import { SOURCE_FOLIO_CODE } from '../Utils/const';
import { cloneOrder } from '../Utils/orderResource';
import {
  lineMutatorShape,
  orderRecordsMutatorShape,
} from '../Utils/mutators';
import {
  ORDER,
} from '../Utils/resources';
import { POLineForm } from '../POLine';
import { CURRENCY } from '../POLine/Cost/FieldCurrency';
import LinesLimit from '../PurchaseOrder/LinesLimit';

class LayerPOLine extends Component {
  static manifest = Object.freeze({
    order: ORDER,
  });

  static propTypes = {
    location: ReactRouterPropTypes.location.isRequired,
    history: ReactRouterPropTypes.history,
    match: ReactRouterPropTypes.match,
    parentMutator: PropTypes.shape({
      poLine: lineMutatorShape,
      records: orderRecordsMutatorShape,
    }),
    parentResources: PropTypes.object.isRequired,
    stripes: PropTypes.shape({
      store: PropTypes.object.isRequired,
      connect: PropTypes.func.isRequired,
    }).isRequired,
    onCancel: PropTypes.func.isRequired,
    resources: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.state = {
      isLinesLimitExceededModalOpened: false,
      line: null,
    };
    this.connectedPOLineForm = props.stripes.connect(POLineForm);
  }

  openLineLimitExceededModal = (line) => {
    this.setState({
      isLinesLimitExceededModalOpened: true,
      line,
    });
  }

  closeLineLimitExceededModal = () => {
    this.setState({
      isLinesLimitExceededModalOpened: false,
      line: null,
    });
  }

  submitPOLine = (line) => {
    const newLine = cloneDeep(line);
    const { parentMutator: { poLine }, onCancel } = this.props;

    poLine.POST(newLine)
      .then(() => onCancel())
      .catch(async e => {
        let response;

        try {
          response = await e.json();
        } catch (parsingException) {
          response = e;
        }
        if (response.errors && response.errors.find(el => el.code === 'lines_limit')) {
          this.openLineLimitExceededModal(line);
        } else {
          this.callout.sendCallout({
            message: <FormattedMessage id="ui-orders.errors.lineWasNotCreated" />,
            type: 'error',
          });
        }
      });
  }

  getOrder = () => get(this.props, 'resources.order.records.0');

  getLine = () => {
    const { match: { params: { lineId } } } = this.props;
    const lines = get(this.getOrder(), 'compositePoLines', []);

    return lines.find(u => u.id === lineId);
  }

  createNewOrder = async () => {
    const { parentMutator } = this.props;
    const order = this.getOrder();

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
    } finally {
      this.closeLineLimitExceededModal();
    }
  }

  updatePOLine = (data) => {
    const line = cloneDeep(data);
    const { parentMutator, location: { pathname } } = this.props;

    // remove sample data from payload to prevent errors on saving sample lines
    delete line.agreement_id;
    delete line.instance_id;
    delete line.location;
    if (line.eresource) {
      delete line.eresource.license;
    }
    if (line.adjustment) {
      delete line.adjustment.invoice_id;
    }

    const materialSupplier = get(line, 'physical.material_supplier');
    const accessProvider = get(line, 'eresource.access_provider');

    if (materialSupplier === '') {
      line.physical.material_supplier = null;
    }
    if (accessProvider === '') {
      line.eresource.access_provider = null;
    }

    parentMutator.poLine.PUT(line).then(() => {
      parentMutator.query.update({
        _path: `${pathname}`,
        layer: null,
      });
    });
  }

  deletePOLine = (lineId) => {
    const { parentMutator, match: { params: { id } } } = this.props;

    parentMutator.poLine.DELETE({ id: lineId }).then(() => {
      parentMutator.query.update({
        _path: `/orders/view/${id}`,
        layer: null,
      });
    });
  }

  getCreatePOLIneInitialValues() {
    const { match } = this.props;
    const orderId = get(match, 'params.id');

    const newObj = {
      source: {
        code: SOURCE_FOLIO_CODE,
      },
      cost: {
        currency: CURRENCY.usd,
      },
      vendor_detail: {
        instructions: '',
      },
    };

    // Due to not perfect component hierarchy, the 'real' new PO Line goes only if orderId is not falsy
    if (orderId) {
      newObj.purchase_order_id = orderId;
    }

    return newObj;
  }

  createCalloutRef = ref => {
    this.callout = ref;
  };

  render() {
    const { location } = this.props;
    const { layer } = location.search ? queryString.parse(location.search) : {};
    const { resources, ...restProps } = this.props;
    const order = this.getOrder();

    if (layer === 'create-po-line') {
      return (
        <Layer
          isOpen
          contentLabel="Create PO Line Dialog"
        >
          <this.connectedPOLineForm
            {...restProps}
            initialValues={this.getCreatePOLIneInitialValues()}
            onSubmit={this.submitPOLine}
            order={order}
          />
          {this.state.isLinesLimitExceededModalOpened && (
            <LinesLimit
              cancel={this.closeLineLimitExceededModal}
              createOrder={this.createNewOrder}
            />
          )}
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
            {...restProps}
            initialValues={this.getLine()}
            onSubmit={this.updatePOLine}
            deletePOLine={this.deletePOLine}
            order={order}
          />
        </Layer>
      );
    }

    return null;
  }
}

export default LayerPOLine;
