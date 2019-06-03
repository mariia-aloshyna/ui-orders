import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  AccordionSet,
} from '@folio/stripes/components';

import { RECEIPT_STATUS } from '../components/POLine/POLineDetails/FieldReceiptStatus';
import { PAYMENT_STATUS } from '../components/POLine/POLineDetails/FieldPaymentStatus';
import LocationFilter from '../common/LocationFilter';
import OrdersCheckboxFilter from '../common/OrdersCheckboxFilter';
import VendorFilter from '../common/VendorFilter';
import OrdersDateRangeFilter from '../common/OrdersDateRangeFilter';
import MaterialTypeFilter from '../common/MaterialTypeFilter';
import {
  ACQUISITION_METHOD_FILTER_OPTIONS,
  ORDER_FORMAT_FILTER_OPTIONS,
  PAYMENT_STATUS_FILTER_OPTIONS,
  RECEIPT_STATUS_FILTER_OPTIONS,
} from '../OrdersList/constants';
import {
  locationsShape,
  materialTypesShape,
  vendorsShape,
} from '../common/shapes';
import { FILTERS } from './constants';

const DEFAULT_FILTERS = [
  `${FILTERS.RECEIPT_STATUS}.${RECEIPT_STATUS.partiallyReceived}`,
  `${FILTERS.RECEIPT_STATUS}.${RECEIPT_STATUS.awaitingReceipt}`,
  `${FILTERS.RECEIPT_STATUS}.${RECEIPT_STATUS.pending}`,
  `${FILTERS.PAYMENT_STATUS}.${PAYMENT_STATUS.partiallyPaid}`,
  `${FILTERS.PAYMENT_STATUS}.${PAYMENT_STATUS.awaitingPayment}`,
  `${FILTERS.PAYMENT_STATUS}.${PAYMENT_STATUS.pending}`,
];

class OrderLinesFilters extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    activeFilters: PropTypes.object.isRequired,
    locations: locationsShape,
    vendors: vendorsShape,
    materialTypes: materialTypesShape,
    queryMutator: PropTypes.object,
  };

  componentDidMount() {
    const { queryMutator } = this.props;
    const filters = DEFAULT_FILTERS.join(',');

    queryMutator.update({ filters });
  }

  render() {
    const { activeFilters, onChange, locations, materialTypes, vendors } = this.props;

    return (
      <AccordionSet>
        <OrdersCheckboxFilter
          activeFilters={activeFilters[FILTERS.RECEIPT_STATUS]}
          closedByDefault={false}
          id={FILTERS.RECEIPT_STATUS}
          labelId="ui-orders.poLine.receiptStatus"
          name={FILTERS.RECEIPT_STATUS}
          onChange={onChange}
          options={RECEIPT_STATUS_FILTER_OPTIONS}
        />
        <OrdersCheckboxFilter
          activeFilters={activeFilters[FILTERS.PAYMENT_STATUS]}
          closedByDefault={false}
          id={FILTERS.PAYMENT_STATUS}
          labelId="ui-orders.poLine.paymentStatus"
          name={FILTERS.PAYMENT_STATUS}
          onChange={onChange}
          options={PAYMENT_STATUS_FILTER_OPTIONS}
        />
        <OrdersCheckboxFilter
          activeFilters={activeFilters[FILTERS.ACQUISITION_METHOD]}
          labelId="ui-orders.poLine.acquisitionMethod"
          name={FILTERS.ACQUISITION_METHOD}
          onChange={onChange}
          options={ACQUISITION_METHOD_FILTER_OPTIONS}
        />
        <LocationFilter
          activeFilters={activeFilters[FILTERS.LOCATION]}
          labelId="ui-orders.line.accordion.location"
          name={FILTERS.LOCATION}
          onChange={onChange}
          locations={locations}
        />
        <OrdersCheckboxFilter
          activeFilters={activeFilters[FILTERS.ORDER_FORMAT]}
          labelId="ui-orders.poLine.orderFormat"
          name={FILTERS.ORDER_FORMAT}
          onChange={onChange}
          options={ORDER_FORMAT_FILTER_OPTIONS}
        />
        <MaterialTypeFilter
          activeFilters={activeFilters[FILTERS.MATERIAL_TYPE_ELECTRONIC]}
          isElectronic
          name={FILTERS.MATERIAL_TYPE_ELECTRONIC}
          onChange={onChange}
          materialTypes={materialTypes}
        />
        <MaterialTypeFilter
          activeFilters={activeFilters[FILTERS.MATERIAL_TYPE_PHYSICAL]}
          name={FILTERS.MATERIAL_TYPE_PHYSICAL}
          onChange={onChange}
          materialTypes={materialTypes}
        />
        <OrdersDateRangeFilter
          activeFilters={activeFilters[FILTERS.DATE_CREATED]}
          id={FILTERS.DATE_CREATED}
          labelId="ui-orders.poLine.dateCreated"
          name={FILTERS.DATE_CREATED}
          onChange={onChange}
        />
        <VendorFilter
          activeFilters={activeFilters[FILTERS.VENDOR]}
          labelId="ui-orders.line.accordion.vendor"
          name={FILTERS.VENDOR}
          onChange={onChange}
          vendors={vendors}
        />
      </AccordionSet>
    );
  }
}

export default OrderLinesFilters;
